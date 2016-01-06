/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import bodyParser from 'body-parser';

import mongo from 'mongodb';
import monk from 'monk';
var db = monk('localhost:27017/gym');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Get all programs.
app.get('/programs', function(req, res) {
  var collection = db.get('programs');
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
});
//Insert a program.
app.post('/addprogram', function(req, res) {
  var program = req.body.name;
  // Set our internal DB variable
  var collection = db.get('programs');
  // Submit to the DB
  collection.insert({
    "name" : program
  }, function (err, doc) {
    if (err) {
      // failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // success, return all programs
      collection.find({}, {}, function(e, docs) {
        res.json(docs);
      });
    }
  });
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
