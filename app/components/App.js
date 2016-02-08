import React from 'react';
import Navigation from './Navigation';

require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../styles/style.sass');

const App = ({ children, history}) => {
  return (
    <div className="app">
      <Navigation history={history} />
      {children}
      <footer className="footer">
        <div className="container">Copyright Henrik &amp; Erik</div>
      </footer>
    </div>
  );
};

export default App;