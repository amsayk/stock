import React from 'react';

import { PATH_SUPPLIER_PREFIX } from 'vars';

import Route from 'react-router/Route';

import Home from './containers/Home';

import UserIsAuthenticated from 'authWrappers/UserIsAuthenticated';

export default (
  <Route
    path={PATH_SUPPLIER_PREFIX + '/:id'}
    component={UserIsAuthenticated(Home)}
  />
);
