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


// Get all programs.
apiRoutes.get('/programs/:trainerId', function(req, res) {
  let { trainerId } = req.params;
  var collection = db.get('programs');
  collection.find({trainer_id: trainerId}, function(e, docs) {
    res.json(docs);
  });
});

apiRoutes.get('/exercises/:programId', function(req, res) {
  let { programId } = req.params;
  var collection = db.get('exercises');
  collection.find({program_id: programId}, function(e, docs) {
    res.json(docs);
  });
});


// Insert a program.
apiRoutes.post('/addprogram', function(req, res) {
  let { trainerId, program } = req.body;
  // Same simple validation as on the front-end.
  if (!/^[a-zA-Z0-9/åäöÅÄÖ -]+$/.test(program) || !program.trim() ) {
    console.log('Invalid input.');
    this.setState({error: true});
    return;
  }
  var collection = db.get('programs');
  // Submit to the DB
  collection.insert(
    {
      name: program,
      trainer_id: trainerId
    },
    function(err, doc) {
      if (err) {
        console.log(err);
        // failed, return error
        return res.status(500).send(err);
      }
      // success, return all programs
      collection.find({trainer_id: trainerId}, function(e, docs) {
        res.json(docs);
      });
    }
  );
});

apiRoutes.post('/addexercise', function(req, res) {
  let { programId, exerciseName } = req.body;
  // Set our internal DB variable
  var collection = db.get('exercises');
  // Submit to the DB
  collection.insert(
    {
      name: exerciseName,
      program_id: programId
    },
    function(err, doc) {
      if (err) {
        console.log(err);
        // failed, return error
        return res.status(500).send(err);
      }
      // success, return all programs
      collection.find({program_id: programId}, function(e, docs) {
        res.json(docs);
      });
    }
  );
});

apiRoutes.post('/addresult', function(req, res) {
  let { exerciseId, results } = req.body;
  let collection = db.get('results');
  collection.insert(
    {
      exercise_id: exerciseId,
      date: new Date(),
      sets: JSON.parse(results)
    },
    function(err, doc) {
      if (err) {
        console.log(err);
        // failed, return error
        return res.status(500).send(err);
      }
      collection.find({exercise_id: exerciseId}, {sort: {date: -1}}, function(err, docs) {
        res.json({
          success: true,
          docs: docs
        });
      });
    }
  );
});

apiRoutes.get('/results', function(req, res) {
  let { exerciseId } = req.query;

  let collection = db.get('results');
  collection.find({exercise_id: exerciseId}, {sort: {date: -1}}, function(err, docs) {
    res.json({
      success: true,
      docs: docs
    });
  });
});

apiRoutes.post('/rm_exercise', function(req, res) {
  let { exerciseId } = req.body;

  let collection = db.get('exercises');
  collection.remove({_id: new mongo.ObjectID(exerciseId)}, function(err, docs){
    res.json({
      success: true,
      docs: docs
    });
  });

  return res;
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
