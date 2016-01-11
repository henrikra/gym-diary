import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Home from './components/Home';
import Programs from './components/Programs';
import Program from './components/Program';
import Login from './components/Login';
import Register from './components/Register';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import auth from './auth'

let requireAuth = (nextState, replaceState) => {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
}

ReactDOM.render(
	<Router history={browserHistory}>
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
