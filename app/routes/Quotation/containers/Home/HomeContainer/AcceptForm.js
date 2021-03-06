/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import T from 'prop-types';

import Loading from 'components/Loading';

import * as DataLoader from 'routes/Quotation/DataLoader';

import style from 'routes/Quotation/styles';

import compose from 'redux/lib/compose';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import { injectIntl } from 'react-intl';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
});

class AcceptForm extends React.Component {
  onAccept = async () => {
    this.setState({ loading: true });

    const { id, acceptQuotation } = this.props;

    const { data: { acceptQuotation: { error } } } = await acceptQuotation(id);

    if (error) {
      //
    }

    this.context.snackbar.show({
      message: error ? 'Erreur inconnu. Veuillez ré-essayer.' : 'Succès',
      duration: 2500,
    });

    this.onClose();
  };

  onClose = () => this.setState({ open: false });

  state = {
    loading: false,
    open: true,
  };

  render() {
    const { classes, handleRequestClose } = this.props;
    return (
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        ignoreBackdropClick
        ignoreEscapeKeyUp
        open={this.state.open}
        transition={Slide}
        onRequestClose={this.onClose}
        onExited={handleRequestClose}
      >
        <DialogTitle>{'Accepter ce devis?'}</DialogTitle>
        {this.state.loading ? (
          <div className={style.center}>
            <Loading />
          </div>
        ) : (
          [
            <DialogContent key="content">
              <DialogContentText>
                Une nouvelle facture de vente sera généré automatiquement.
              </DialogContentText>
            </DialogContent>,
            <DialogActions key="actions">
              <Button onClick={this.onClose} color="primary">
                Retour
              </Button>
              <Button onClick={this.onAccept} color="primary">
                Oui, Accepter
              </Button>
            </DialogActions>,
          ]
        )}
      </Dialog>
    );
  }
}

AcceptForm.propTypes = {
  id: T.string.isRequired,
};

AcceptForm.contextTypes = {
  snackbar: T.object.isRequired,
};

export default compose(
  withStyles(styles),
  injectIntl,
  DataLoader.acceptQuotation,
)(AcceptForm);
