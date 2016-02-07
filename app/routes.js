import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Programs from './components/Programs';
import Program from './components/Program';
import ProgramsNew from './components/ProgramsNew';
import ExercisesNew from './components/ExercisesNew';
import Exercise from './components/Exercise';
import Login from './components/Login';
import Register from './components/Register';

import auth from './auth';

const requireAuth = (nextState, replaceState) => {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
};

export default (
	<Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="programs" component={Programs} onEnter={requireAuth} />
    <Route path="programs/new" component={ProgramsNew} />
    <Route path="programs/:programId" component={Program} />
    <Route path="exercises/new" component={ExercisesNew} />
    <Route path="exercises/:exerciseId" component={Exercise} />
  </Route>
);