import React from 'react';
import Link from 'react-router-dom/Link';

import { PATH_EXPENSES } from 'vars';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Report from './Report';

import pick from 'lodash.pick';

// import ExpenseForm from 'routes/Expenses/containers/Home/HomeContainer/ExpenseForm';

import style from 'routes/Expense/styles';

import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreHorizIcon from 'material-ui-icons/MoreHoriz';

const styles = theme => ({
  button: {},
});

const ITEM_HEIGHT = 48;

class PageHeader extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    dialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true, open: false, anchorEl: null });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { intl, data, classes } = this.props;
    const { getExpense: n } = data;

    const options = [];

    if (n) {
      if (!n.isFullyPaid) {
        options.push('Enregistrer un paiement');
      }

      options.push('Annuler');
    }

    return (
      <div className={style.pageHeader}>
        <div className={style.title}>
          <Typography type="display1" gutterBottom>
            <Link className={style.titleLink} to={PATH_EXPENSES}>
              Dépenses
            </Link>
          </Typography>
          {n
            ? [
                <Typography
                  className={style.breadcrumb}
                  type="title"
                  gutterBottom
                >
                  #{n.expense.refNo}
                </Typography>,

                <div className={style.actions}>
                  <IconButton
                    aria-label="Actions"
                    aria-owns={this.state.open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                      },
                    }}
                  >
                    {options.map(option => (
                      <MenuItem key={option} onClick={this.handleClickOpen}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>,
              ]
            : null}
        </div>

        <div>
          {n ? (
            <Report
              intl={intl}
              expense={n}
            />
          ) : null}
        </div>

        {/* {this.state.dialogOpen ? ( */}
        {/*   <ExpenseForm */}
        {/*     onClose={this.handleDialogClose} */}
        {/*     initialValues={{ */}
        {/*       ...pick(n.client, [ */}
        {/*         'displayName', */}
        {/*         'tel', */}
        {/*         'email', */}
        {/*         'address', */}
        {/*         'taxId', */}
        {/*       ]), */}
        {/*     }} */}
        {/*     id={n.client.id} */}
        {/*     title="Nouveau client" */}
        {/*   /> */}
        {/* ) : null} */}
      </div>
    );
  }
}

export default withStyles(styles)(PageHeader);
