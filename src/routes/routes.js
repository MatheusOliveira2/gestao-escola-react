import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';

import Classes from '../components/classes/Class';
import ClassInfo from '../components/classes/ClassInfo';
import CreateClass from '../components/classes/CreateClass';

import Students from '../components/students/Students';
import CreateStudent from '../components/students/CreateStudent';

import Teachers from '../components/';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/classes" component={Classes}></Route>
        <Route exact path="/classes/info" component={ClassInfo}></Route>
        <Route exact path="/classes/create" component={CreateClass}></Route>

        <Route exact path="/students" component={Students}></Route>
        <Route exact path="/students/create" component={CreateStudent}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
