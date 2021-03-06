import keyOf from 'fbjs/lib/keyOf';

export const INVALID_MAC = keyOf({ INVALID_MAC: null });
export const DB_STATUS = keyOf({ DB_STATUS: null });
export const APP_STATE_CHANGE = keyOf({ APP_STATE_CHANGE: null });
export const TOGGLE_SEARCH = keyOf({ TOGGLE_SEARCH: null });

export class DBStatus {
  static PENDING = keyOf({ 'DB_STATUS/pending': null });
  static NEW = keyOf({ 'DB_STATUS/new': null });
  static OK = keyOf({ 'DB_STATUS/ok': null });
  static FAILED = keyOf({ 'DB_STATUS/failed': null });
}
