import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { Router } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import reducers from './reducers';
import routes from './routes';

const history = createHistory({
  queryKey: false
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={history} routes={routes} />
	</Provider>
  , document.getElementById('root')
);
