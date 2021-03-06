import React from 'react';
import T from 'prop-types';

import { compose } from 'redux';

import { withApollo } from 'react-apollo';

import checkBusiness from 'utils/checkBusiness';

import {
  reduxForm,
  Field,
  propTypes as reduxFormPropTypes,
  SubmissionError,
} from 'redux-form/immutable';

import ImmutablePropTypes from 'react-immutable-proptypes';

import isEmpty from 'isEmpty';

import { intlShape } from 'react-intl';

import messages from 'routes/Settings/messages';

import style from 'routes/Settings/styles';

import validations from './validations';

import validationMessages from 'validation-messages';

import BusinessNameField from 'routes/Settings/components/BusinessNameField';
import BusinessDescriptionField from 'routes/Settings/components/BusinessDescriptionField';
import OptionalTextInputField from 'routes/Settings/components/OptionalTextInputField';
import CountryField from 'routes/Settings/components/CountryField';

import MUTATION from './updateUserBusiness.mutation.graphql';

import update from 'react-addons-update';

export class BusinessDetailsForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onKeyDown = this._onKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  _onKeyDown(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      const submit = this.props.handleSubmit(this.onSubmit);
      submit();
    }
  }

  async onSubmit(data) {
    try {
      await validations.asyncValidate(data);
    } catch (e) {
      throw new SubmissionError(e);
    }

    const { intl } = this.props;

    const payload = {
      displayName: data.get('displayName'),
      url: data.get('url'),
      country: data.get('country'),
      city: data.get('city'),
      address: data.get('address'),
      postalCode: data.get('postalCode'),
      phone: data.get('phone'),
      fax: data.get('fax'),
      email: data.get('email'),
      taxId: data.get('taxId'),
      rc: data.get('rc'),
      ice: data.get('ice'),
      cnss: data.get('cnss'),
      patente: data.get('patente'),
    };

    const {
      data: { updateBusiness: { errors } },
    } = await this.props.client.mutate({
      mutation: MUTATION,
      variables: {
        payload,
      },
      updateQueries: {
        getUser: (prev, { mutationResult }) => {
          const newOrUpdatedBusiness =
            mutationResult.data.updateUserBusiness.business;
          return isEmpty(errors)
            ? update(prev, {
                currentUser: {
                  business: {
                    $set: newOrUpdatedBusiness,
                  },
                },
              })
            : prev;
        },
      },
    });

    if (!isEmpty(errors)) {
      throw new SubmissionError(errors);
    }

    const { snackbar } = this.context;
    if (snackbar) {
      snackbar.show({
        message: intl.formatMessage(messages.businessUpdateSuccessNotification),
      });
    }

    // currentUser.business has changed, refresh notification.
    await checkBusiness();
  }

  render() {
    const { intl, handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <div className={style.content}>
        <h1 className={style.formHeading}>
          {intl.formatMessage(messages.linkBusinessDetails)}
        </h1>
        <div className={style.form}>
          <Field
            name="displayName"
            component={BusinessNameField}
            label={intl.formatMessage(messages.labelBusinessName)}
            onKeyDown={this.onKeyDown}
          />
          <Field
            name="url"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelURL)}
            onKeyDown={this.onKeyDown}
          >
            <div className={style.formControlFeedback} when={'webSite'}>
              {intl.formatMessage(validationMessages.urlInvalid)}
            </div>
          </Field>
          <Field
            name="country"
            component={CountryField}
            label={intl.formatMessage(messages.labelCountry)}
            onKeyDown={this.onKeyDown}
          />
          <Field
            name="city"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelCity)}
            onKeyDown={this.onKeyDown}
          />
          <Field
            name="address"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelAddress)}
            onKeyDown={this.onKeyDown}
          />
          <Field
            name="postalCode"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelPostalCode)}
            onKeyDown={this.onKeyDown}
            className={style.width15Percent}
          >
            <div className={style.formControlFeedback} when={'zipCode'}>
              {intl.formatMessage(validationMessages.zipInvalid)}
            </div>
          </Field>
          <Field
            name="phone"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelPhone)}
            onKeyDown={this.onKeyDown}
          >
            <div className={style.formControlFeedback} when={'phoneNumber'}>
              {intl.formatMessage(validationMessages.phoneInvalid)}
            </div>
          </Field>
          <Field
            name="fax"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelFax)}
            onKeyDown={this.onKeyDown}
          >
            <div className={style.formControlFeedback} when={'phoneNumber'}>
              {intl.formatMessage(validationMessages.phoneInvalid)}
            </div>
          </Field>
          <Field
            name="email"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelEmail)}
            onKeyDown={this.onKeyDown}
          >
            <div className={style.formControlFeedback} when={'email'}>
              {intl.formatMessage(validationMessages.emailInvalid)}
            </div>
          </Field>
          <Field
            name="patente"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelPatente)}
            onKeyDown={this.onKeyDown}
          />
          <Field
            name="taxId"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelTaxId)}
            onKeyDown={this.onKeyDown}
          />
          <Field
            name="ice"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelICE)}
            onKeyDown={this.onKeyDown}
          />
          <Field
            name="rc"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelRC)}
            onKeyDown={this.onKeyDown}
          />
          <Field
            name="cnss"
            component={OptionalTextInputField}
            label={intl.formatMessage(messages.labelCNSS)}
            onKeyDown={this.onKeyDown}
          />
          <div className={style.formGroup}>
            <div className={style.offset2} />
            <button
              onClick={handleSubmit(this.onSubmit)}
              disabled={pristine || submitting || invalid}
              className={style.saveButton}
            >
              {intl.formatMessage(messages.save)}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

BusinessDetailsForm.contextTypes = {
  snackbar: T.shape({
    show: T.func.isRequired,
  }),
};

BusinessDetailsForm.defaultProps = {};

BusinessDetailsForm.propTypes = {
  ...reduxFormPropTypes,
  intl: intlShape.isRequired,
  user: ImmutablePropTypes.contains({
    id: T.any.isRequired,
  }).isRequired,
  initialValues: ImmutablePropTypes.contains({
    id: T.string,
    displayName: T.string,
    description: T.string,
    url: T.string,
    country: T.string,
    addressLine1: T.string,
    addressLine2: T.string,
    city: T.string,
    stateProvince: T.string,
    postalCode: T.string,
    phone: T.string,
    taxId: T.string,
  }).isRequired,
};

const Form = reduxForm({
  form: 'business.details',
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
});

export default compose(withApollo, Form)(BusinessDetailsForm);
