import React from 'react';
import T from 'prop-types';

import Typography from 'material-ui/Typography';

import Link from 'react-router-dom/Link';

import * as DataLoader from 'routes/Client/DataLoader';

import compose from 'redux/lib/compose';

import { withStyles } from 'material-ui/styles';

import Empty from './Empty';

import { SALE_REF_NO_BASE } from 'vars';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

import { injectIntl } from 'react-intl';

import Paper from 'material-ui/Paper';

import Loading from 'components/Loading';

import style from 'routes/Client/styles';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

const columnData = [
  {
    id: 'sale.dateCreated',
    numeric: false,
    disablePadding: true,
    label: 'DATE',
  },
  {
    id: 'sale.refNo',
    numeric: false,
    disablePadding: false,
    label: 'Nº',
  },
  {
    id: 'balanceDue',
    numeric: true,
    disablePadding: false,
    label: 'SOLDE',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'TOTAL',
  },
];

class EnhancedTableHead extends React.Component {
  static propTypes = {
    onRequestSort: T.func.isRequired,
    order: T.string.isRequired,
    orderBy: T.string.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

class ClientSales extends React.Component {
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (
      this.props.data.variables.query.orderBy === property &&
      this.props.data.variables.query.order === 'desc'
    ) {
      order = 'asc';
    }

    this.props.data.refetch({ query: { order, orderBy } });
  };

  render() {
    const { data, intl, classes } = this.props;

    if (data.loading) {
      return (
        <div className={style.loading}>
          <Loading />
        </div>
      );
    }

    const { loading, error, getClientSales: n, variables: { query } } = data;

    if (n.sales.length === 0) {
      return <Empty />;
    }

    return (
      <div className={style.pageBody}>
        {/* <Typography type='title'> */}
        {/*   Factures de vente */}
        {/* </Typography> */}
        {/* <br/> */}
        {/* <br/> */}
        <Table>
          <EnhancedTableHead
            order={query.order}
            orderBy={query.orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {n.sales.map(n => {
              return (
                <TableRow hover tabIndex={-1} key={n.sale.id}>
                  <TableCell disablePadding>
                    {intl.formatDate(n.sale.dateCreated, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{n.sale.refNo + SALE_REF_NO_BASE}</TableCell>
                  <TableCell numeric>
                    {intl.formatNumber(n.balanceDue, { format: 'MAD' })}
                  </TableCell>
                  <TableCell numeric>
                    {intl.formatNumber(n.total, { format: 'MAD' })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default compose(injectIntl, withStyles(styles), DataLoader.sales)(
  ClientSales,
);
