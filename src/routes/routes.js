import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Classes from '../components/classes/Class';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/classes" component={Classes}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
