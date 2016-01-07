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

app.post('/register', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var passwordRepeat = req.body.passwordRepeat;

  var collection = db.get('trainers');
  collection.insert({
    email: email,
    password: password
  }, function(err, doc) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(doc);
  });
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var collection = db.get('trainers');
  collection.findOne({email: email, password: password}, function(err, doc) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!doc) {
      return res.status(404).send('trainer-not-found');
    }
    res.status(200).send(doc);
  });
});

//Get all programs.
app.get('/programs', function(req, res) {
  var collection = db.get('programs');
  collection.find({}, function(e, docs) {
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
    name: program
  }, function(err, doc) {
    if (err) {
      console.log(err);
      // failed, return error
      return res.status(500).send(err);
    }
    // success, return all programs
    collection.find({}, function(e, docs) {
      res.json(docs);
    });
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
