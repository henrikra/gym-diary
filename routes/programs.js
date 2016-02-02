import monk from 'monk';
const db = monk('localhost:27017/gym');

export default function(router) {
	// Get all programs.
	router.get('/:trainerId', function(req, res) {
	  let { trainerId } = req.params;
	  var collection = db.get('programs');
	  collection.find({trainer_id: trainerId}, function(e, docs) {
	    res.json(docs);
	  });
	});

	// Insert a program.
	router.post('/', function(req, res) {
	  let { trainerId, program } = req.body;
	  // Same simple validation as on the front-end.
	  if (!/^[a-zA-Z0-9/åäöÅÄÖ -]+$/.test(program) || !program.trim()) {
	    console.log('Invalid input.');
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
}

