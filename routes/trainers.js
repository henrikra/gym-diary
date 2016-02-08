import monk from 'monk';
const db = monk('localhost:27017/gym');
import jwt from 'jsonwebtoken';

export default function(router, app) {
	router.post('/register', function(req, res) {
	  const { email, password, passwordRepeat } = req.body;

	  if (password != passwordRepeat) {
	    return res.json({
	      success: false,
	      message: 'Passwords don\'t match'
	    });
	  }

	  const collection = db.get('trainers');
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

	router.post('/authenticate', (req, res) => {
	  const { email, password } = req.body;

	  const collection = db.get('trainers');

	  collection.findOne({ email }, (err, user) => {
	    if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'User not found' });
	    } else if (user) {
	      // check if password matches
	      if (user.password !== password) {
	        res.json({ success: false, message: 'Wrong password' });
	      } else {
	        const token = jwt.sign(user, app.get('superSecret'), {
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
}

