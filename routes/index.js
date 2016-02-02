import changeCase from 'change-case';
import express from 'express';
const routes = require('require-dir')();

export default function(app) {
  'use strict';
  
  // Initialize all routes
  Object.keys(routes).forEach(function(routeName) {
    var router = express.Router();
    
    // Initialize the route to add its functionality to router
    require('./' + routeName)(router);
    
    // Add router to the speficied route name in the app
    app.use('/api/' + changeCase.paramCase(routeName), router);
  }); 
};