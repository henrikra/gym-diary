import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Home from './components/Home';
import Programs from './components/Programs';
import Program from './components/Program';
import Login from './components/Login';
import Register from './components/Register';
import { Router, Route, IndexRoute } from 'react-router';

import auth from './auth';

import createHistory from 'history/lib/createHashHistory';

let history = createHistory({
  queryKey: false
});

const requireAuth = (nextState, replaceState) => {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
};

ReactDOM.render(
	<Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="programs" component={Programs} onEnter={requireAuth} />
      <Route path="programs/:id" component={Program} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
    </Route>
  </Router>
  , document.getElementById('root')
);
