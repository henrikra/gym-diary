import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './components/Home';
import Programs from './components/Programs';
import Program from './components/Program';
import Exercise from './components/Exercise';
import Login from './components/Login';
import Register from './components/Register';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import auth from './auth';

const history = createHistory({
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
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="programs" component={Programs} onEnter={requireAuth} />
      <Route path="programs/:programId" component={Program} />
      <Route path="exercises/:exerciseId" component={Exercise} />
    </Route>
  </Router>
  , document.getElementById('root')
);
