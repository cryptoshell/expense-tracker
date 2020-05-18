import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Expenses, Dashboard } from '../pages'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Expenses} />
    <Route path="/dashboard" exact component={Dashboard} />
  </Switch>
);

export default Routes;
