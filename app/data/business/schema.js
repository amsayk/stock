import graphqlResolvers from 'data/graphqlResolvers';

import objectAssign from 'object-assign';

import { fromJS } from 'immutable';

import businessValidations from 'routes/Settings/containers/Business/BusinessDetailsContainer/validations';

export const schema = [
  `

  # Country
  enum Country {
    MA
  }

  # ------------------------------------
  # Business type
  # ------------------------------------
  type Business {
    id: ID!

    displayName: String
    description: String
    url: String

    country: Country
    addressLine1: String
    addressLine2: String
    city: String
    stateProvince: String
    postalCode: String

    phone: String
    taxId: String

    date: Date!
    lastModified: Date!
  }

  # ------------------------------------
  # Update user business
  # ------------------------------------
  input UpdateBusinessPayload {
    displayName: String!
    description: String
    url: String

    country: String
    addressLine1: String
    addressLine2: String
    city: String
    stateProvince: String
    postalCode: String

    phone: String
    taxId: String
  }

  type UpdateBusinessResponse {
    business: Business,
    errors: JSON!
  }

`,
];

export const resolvers = {
  Business: objectAssign(
    {},
    graphqlResolvers([
      'id',
      'displayName',
      'description',
      'url',

      'country',
      'addressLine1',
      'addressLine2',
      'city',
      'stateProvince',
      'postalCode',

      'phone',
      'taxId',

      'date',
      'lastModified',
    ]),
  ),

  UpdateBusinessResponse: objectAssign(
    {},
    graphqlResolvers(['business', 'errors']),
  ),

  Mutation: {
    async updateBusiness(obj, { payload }, context) {
      try {
        await businessValidations.asyncValidate(fromJS(payload));
      } catch (errors) {
        return { errors };
      }
      const business = await context.Business.updateBusiness(payload, context);
      return { business, errors: {} };
    },
  },

  Query: {},
};
