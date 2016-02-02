/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import mongo from 'mongodb';
import monk from 'monk';
var db = monk('localhost:27017/gym');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : 8080;
const app = express();
const apiRoutes = express.Router();

app.set('superSecret', 'ilovegoingtothegym');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

require('./routes/index')(app);

apiRoutes.post('/register', function(req, res) {
  let { email, password, passwordRepeat } = req.body;

  if (password != passwordRepeat) {
    return res.json({
      success: false,
      message: 'Passwords don\'t match'
    });
  }

  var collection = db.get('trainers');
  collection.insert({
    email: email,
    password: password
  }, function(err, doc) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({
      success: true,
      doc: doc
    });
  });
});

apiRoutes.post('/authenticate', (req, res) => {
  let { email, password } = req.body;

  var collection = db.get('trainers');

  collection.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'User not found' });
    } else if (user) {
      // check if password matches
      if (user.password !== password) {
        res.json({ success: false, message: 'Wrong password' });
      } else {
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token,
          user
        });
      }
    }
  });
});

app.use('/api', apiRoutes);

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
