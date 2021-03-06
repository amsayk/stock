/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, screen, BrowserWindow } from 'electron';
import MenuBuilder from './menu';

import Store from './utils/Store';

import fs from 'fs';
import path from 'path';

import debug from './utils/log';

import { DBStatus } from './redux/reducers/app/constants';

import puppeteer from 'puppeteer';

import {
  ADMIN_KEY,
  BUSINESS_KEY,
  APP_NAME,
  COUNTRY,
  SALES_REF_NO_BASE,
  CHROME_REMOTE_DEBUGGING_PORT,
  DB_PATH,
  PASSWORD,
} from './vars';
import { setTimeout } from 'core-js/library/web/timers';

const log = debug('app:main');

let win = null;
let browser = null;

if (process.env.NODE_ENV === 'production' || process.env.DEBUG_PROD === 'true') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const {
    default: installExtension,
    REACT_PERF,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
    APOLLO_DEVELOPER_TOOLS,
  } = require('electron-devtools-installer');

  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  try {
    const name = await installExtension(
      [
        REACT_DEVELOPER_TOOLS,
        REACT_PERF,
        APOLLO_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS,
      ],
      forceDownload,
    );

    log(`${name} installed.`);
  } catch (e) {
    log.error(e);
  }
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  try {
    browser.close();
  } catch (e) {}
});

const setupDB = new Promise(resolve => {
  fs.access(DB_PATH, fs.constants.R_OK | fs.constants.W_OK, err => {
    let status = DBStatus.OK;

    if (err) {
      log(`DB does not exist, creating...`);

      status = DBStatus.NEW;

      try {
        const Database = require('better-sqlite3');
        const db = new Database(DB_PATH, { fileMustExist: false });

        const begin = db.prepare('BEGIN');
        const commit = db.prepare('COMMIT');
        const rollback = db.prepare('ROLLBACK');

        begin.run();
        try {
          // Products table
          db.exec(
            `
            CREATE TABLE products (
              id            TEXT PRIMARY KEY,
              displayName   TEXT NOT NULL,
              unitPrice     INTEGER,

              ref           TEXT,

              date          INTEGER NOT NULL,
              lastModified  INTEGER NOT NULL
            ) WITHOUT ROWID;

            CREATE VIRTUAL TABLE products_index USING fts5(
              displayName,
              ref,
              id UNINDEXED,
              tokenize=porter
            );

            -- Trigger on CREATE
            CREATE TRIGGER after_products_insert AFTER INSERT ON products BEGIN
              INSERT INTO products_index (
                id,
                displayName,
                ref
              )
              VALUES(
                new.id,
                new.displayName,
                new.ref
              );
            END;

            -- Trigger on UPDATE
            CREATE TRIGGER after_products_update__displayName UPDATE OF displayName ON products BEGIN
              UPDATE products_index SET displayName = new.displayName WHERE id = old.id;
            END;
            CREATE TRIGGER after_products_update__ref UPDATE OF ref ON products BEGIN
              UPDATE products_index SET ref = new.ref WHERE id = old.id;
            END;

            -- Trigger on DELETE
            CREATE TRIGGER after_products_delete AFTER DELETE ON products BEGIN
                DELETE FROM products_index WHERE id = old.id;
            END;

            `,
          );

          // Sales

          db.exec(
            `
            CREATE TABLE sales (
              id            TEXT PRIMARY KEY,
              refNo         INTEGER NOT NULL,
              clientId      INTEGER NOT NULL,

              dateCreated   INTEGER NOT NULL,

              -- state: extensible indicator of whether sale is valid or voided
              state         INTEGER NOT NULL DEFAULT 1,

              date          INTEGER NOT NULL,
              lastModified  INTEGER NOT NULL
            ) WITHOUT ROWID;

            CREATE VIRTUAL TABLE sales_index USING fts5(
              refNo,
              id UNINDEXED,
              tokenize=porter
            );

            -- Trigger on CREATE
            CREATE TRIGGER after_sales_insert AFTER INSERT ON sales BEGIN
              INSERT INTO sales_index (
                id,
                refNo
              )
              VALUES(
                new.id,
                new.refNo + ${SALES_REF_NO_BASE}
              );
            END;

            -- Trigger on DELETE
            CREATE TRIGGER after_sales_delete AFTER DELETE ON sales BEGIN
              DELETE FROM sales_index WHERE id = old.id;
            END;

            `,
          );

          db.exec(
            `
            CREATE UNIQUE INDEX idx_sales_id ON sales (id);
          `,
          );

          // Quotations

          db.exec(
            `
            CREATE TABLE quotations (
              id            TEXT PRIMARY KEY,
              refNo         INTEGER NOT NULL,
              clientId      INTEGER NOT NULL,

              saleId        INTEGER,

              dateCreated   INTEGER NOT NULL,

              -- state: extensible indicator of whether quotation is pending(1) or voided(2) or accepted(3)
              state         INTEGER NOT NULL DEFAULT 1,

              date          INTEGER NOT NULL,
              lastModified  INTEGER NOT NULL
            ) WITHOUT ROWID;

            CREATE VIRTUAL TABLE quotations_index USING fts5(
              refNo,
              id UNINDEXED,
              tokenize=porter
            );

            -- Trigger on CREATE
            CREATE TRIGGER after_quotations_insert AFTER INSERT ON quotations BEGIN
            INSERT INTO quotations_index (
              id,
              refNo
            )
            VALUES(
              new.id,
              new.refNo
            );
            END;

            -- Trigger on DELETE
            CREATE TRIGGER after_quotations_delete AFTER DELETE ON quotations BEGIN
            DELETE FROM quotations_index WHERE id = old.id;
            END;

            `,
          );

          db.exec(
            `
            CREATE UNIQUE INDEX idx_quotations_id ON quotations (id);
            `,
          );

          // Expenses

          db.exec(
            `
            CREATE TABLE expenses (
              id            TEXT PRIMARY KEY,
              refNo         TEXT,
              beneficiaryId INTEGER NOT NULL,

              dateCreated   INTEGER NOT NULL,

              -- state: extensible indicator of whether expense is valid or voided
              state         INTEGER NOT NULL DEFAULT 1,

              date          INTEGER NOT NULL,
              lastModified  INTEGER NOT NULL
            ) WITHOUT ROWID;

            CREATE VIRTUAL TABLE expenses_index USING fts5(
              refNo,
              id UNINDEXED,
              tokenize=porter
            );

            -- Trigger on CREATE
            CREATE TRIGGER after_expenses_insert AFTER INSERT ON expenses BEGIN
              INSERT INTO expenses_index (
                id,
                refNo
              )
              VALUES(
                new.id,
                new.refNo
              );
            END;

            -- Trigger on DELETE
            CREATE TRIGGER after_expenses_delete AFTER DELETE ON expenses BEGIN
              DELETE FROM expenses_index WHERE id = old.id;
            END;

            `,
          );

          // items

          db.exec(
            `
            CREATE TABLE items (
              id            TEXT PRIMARY KEY,

              -- type { SALE, EXPENSE }
              type          TEXT NOT NULL,

              -- References either sale or expense
              foreignId     INTEGER NOT NULL,

              productId     INTEGER NOT NULL,

              qty           INTEGER NOT NULL,

              -- Prices are multiplied by 100
              unitPrice     INTEGER NOT NULL,

              dateCreated   INTEGER NOT NULL,

              date          INTEGER NOT NULL
            ) WITHOUT ROWID;
            `,
          );

          // payments

          db.exec(
            `
            CREATE TABLE payments (
              id           TEXT PRIMARY KEY,

              -- state: extensible indicator of whether expense is valid or voided
              state         INTEGER NOT NULL DEFAULT 1,

              -- type { SALE, EXPENSE }
              type         TEXT NOT NULL,

              -- References either sale or expense
              foreignId    INTEGER NOT NULL,

              -- Amounts are multiplied by 100
              amount       INTEGER NOT NULL,

              dateCreated  INTEGER NOT NULL,

              date         INTEGER NOT NULL
            ) WITHOUT ROWID;
            `,
          );

          // People table
          db.exec(
            `
            CREATE TABLE people (
              id            TEXT PRIMARY KEY,
              displayName   TEXT NOT NULL,
              email         TEXT,
              tel           TEXT,
              address       TEXT,
              taxId         TEXT,

              type          TEXT NOT NULL,

              date          INTEGER NOT NULL,
              lastModified  INTEGER NOT NULL
            ) WITHOUT ROWID;

            CREATE VIRTUAL TABLE people_index USING fts5(
              displayName,
              email,
              tel,
              taxId,
              address,
              type UNINDEXED,
              id UNINDEXED,
              tokenize=porter
            );

            -- Trigger on CREATE
            CREATE TRIGGER after_people_insert AFTER INSERT ON people BEGIN
              INSERT INTO people_index (
                id,
                displayName,
                email,
                tel,
                taxId,
                address,
                type
              )
              VALUES(
                new.id,
                new.displayName,
                new.email,
                new.tel,
                new.taxId,
                new.address,
                new.type
              );
            END;

            -- Trigger on UPDATE
            CREATE TRIGGER after_people_update__displayName UPDATE OF displayName ON people BEGIN
              UPDATE people_index SET displayName = new.displayName WHERE id = old.id;
            END;
            CREATE TRIGGER after_people_update__email UPDATE OF email ON people BEGIN
              UPDATE people_index SET email = new.email WHERE id = old.id;
            END;
            CREATE TRIGGER after_people_update__tel UPDATE OF tel ON people BEGIN
              UPDATE people_index SET tel = new.tel WHERE id = old.id;
            END;
            CREATE TRIGGER after_people_update__taxId UPDATE OF taxId ON people BEGIN
              UPDATE people_index SET taxId = new.taxId WHERE id = old.id;
            END;
            CREATE TRIGGER after_people_update__address UPDATE OF address ON people BEGIN
            UPDATE people_index SET address = new.address WHERE id = old.id;
            END;

            -- Trigger on DELETE
            CREATE TRIGGER after_people_delete AFTER DELETE ON people BEGIN
                DELETE FROM people_index WHERE id = old.id;
            END;

            `,
          );

          // Event table
          db.exec(
            `
            CREATE TABLE events (
              id          TEXT PRIMARY KEY,

              -- ns { QUOTATIONS, SALES, EXPENSES, PRODUCTS, CLIENTS, SUPPLIERS }
              ns          TEXT NOT NULL,

              -- type of event
              type        TEXT NOT NULL,

              metadata    TEXT NOT NULL,
              timestamp   INTEGER NOT NULL,

              -- A payment was made on an expense or a sale
              paymentId   INTEGER,

              -- A quotation was created, modified or deleted
              quotationId      INTEGER,

              -- A sale was created, modified or deleted
              saleId      INTEGER,

              -- An expense was created, modified or deleted
              expenseId   INTEGER,

              -- A product was created, modified or deleted
              productId   INTEGER,

              -- A client was created, modified or deleted
              clientId    INTEGER,

              -- A supplier was created, modified or deleted
              supplierId  INTEGER
            ) WITHOUT ROWID;
            `,
          );

          db.exec(
            `
            CREATE INDEX idx_events_timestamp ON events (timestamp);
          `,
          );

          // Business table
          db.exec(
            `
            CREATE TABLE business (
              key           TEXT PRIMARY KEY,
              displayName   TEXT NOT NULL,
              url           TEXT,
              country       TEXT NOT NULL,
              city          TEXT,
              address       TEXT,
              postalCode    TEXT,
              phone         TEXT,
              fax           TEXT,
              email         TEXT,
              ice           TEXT,
              rc            TEXT,
              patente       TEXT,
              cnss          TEXT,
              taxId         TEXT,
              date          INTEGER NOT NULL,
              lastModified  INTEGER NOT NULL
            ) WITHOUT ROWID;
            `,
          );

          db.exec(
            `
            INSERT INTO business (key, displayName, country, date, lastModified) VALUES ('${BUSINESS_KEY}', '${APP_NAME}', '${COUNTRY}', strftime('%s','now'), strftime('%s','now'));
            `,
          );

          // users table
          db.exec(
            `
              CREATE TABLE users (
                id                        TEXT PRIMARY KEY,
                password                  TEXT NOT NULL,
                displayName               TEXT NOT NULL,
                username                  VARCHAR NOT NULL,
                email                     VARCHAR,
                changePasswordAtNextLogin BOOLEAN NOT NULL DEFAULT 0,
                date                      INTEGER NOT NULL,
                lastModified              INTEGER NOT NULL
              ) WITHOUT ROWID;
            `,
          );

          // username unique index
          db.exec(
            `
            CREATE UNIQUE INDEX idx_users_username ON users (username);
          `,
          );

          // lastModified index
          db.exec(
            `
            CREATE INDEX idx_users_lastModified ON users (lastModified);
          `,
          );

          // Initial user
          db.exec(
            `
            INSERT INTO users (id, password, displayName, username, changePasswordAtNextLogin, date, lastModified) VALUES (${ADMIN_KEY}, '${PASSWORD}', 'Admin', 'admin', ${
              process.env.NODE_ENV === 'development' ||
              process.env.DEBUG_PROD === 'true'
                ? 0
                : 1
            }, strftime('%s','now'), strftime('%s','now'));
          `,
          );

          commit.run();
        } finally {
          if (db.inTransaction) rollback.run();

          try {
            db.close();
          } catch (e) {}
        }
      } catch (e) {
        log.error(`DB error:`, e);

        try {
          fs.unlinkSync(DB_PATH);
        } catch (e) {}

        status = DBStatus.FAILED;

        setTimeout(() => {
          throw e;
        }, 0);
      }
    }

    // TODO: check if admin user and business exist.

    resolve(status);
  });
});

const isSecondInstance = app.makeSingleInstance(
  (commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  },
);

if (isSecondInstance) {
  app.quit();
}

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const status = await setupDB;

  const screenSize = screen.getPrimaryDisplay().workAreaSize;

  const bounds = Store.get('window.bounds') || {
    width: Math.min(1281, screenSize.width),
    height: Math.min(768, screenSize.height),
  };

  win = new BrowserWindow({
    show: false,
    ...bounds,
    title: APP_NAME,
  });

  const url = require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: path.resolve(__dirname, 'app.html'),
    hash: '/',
  });

  win.loadURL(url);

  win.once('ready-to-show', () => {
    if (!win) {
      throw new Error(`'win' is not defined`);
    }
    win.show();
    win.focus();
  });

  win.webContents.on('did-finish-load', async () => {
    if (!win) {
      throw new Error(`'win' is not defined`);
    }

    win.webContents.send('db-status', {
      status,
    });
  });

  win.on('close', () => {
    if (win) {
      Store.set({
        'window.bounds': win.getBounds(),
      });
    }
  });

  win.on('closed', () => {
    win = null;
  });

  const menuBuilder = new MenuBuilder(win);
  menuBuilder.buildMenu();

  // Launch background browser for printing.
  (async () => {
    try {
      const options = {};

      if (process.env.NODE_ENV === 'production') {
        const exe = puppeteer.executablePath();
        const executablePath = exe.replace('app.asar', 'app.asar.unpacked');
        options.executablePath = executablePath;
      }

      browser = await puppeteer.launch({
        ...options,
        handleSIGINT: false,
        dumpio:
          process.env.NODE_ENV !== 'production' ||
          process.env.DEBUG_PROD === 'true',
        args: [
          `--remote-debugging-port=${CHROME_REMOTE_DEBUGGING_PORT}`,
          '--disable-sandbox',
          '--disable-setuid-sandbox',
        ],
      });
    } catch (e) {
      log.error('[PUPPETEER] failed:', e);
    }
  })();
});
