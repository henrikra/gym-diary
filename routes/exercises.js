import monk from 'monk';
const db = monk('localhost:27017/gym');

export default function(router) {
	router.get('/:programId', function(req, res) {
	  let { programId } = req.params;
	  var collection = db.get('exercises');
	  collection.find({program_id: programId}, function(e, docs) {
	    res.json(docs);
	  });
	});

	router.post('/', function(req, res) {
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

	router.delete('/:exerciseId', function(req, res) {
	  const { exerciseId } = req.params;
	  const collection = db.get('exercises');
	  collection.remove({_id: exerciseId}, function(err, docs){
	    res.json({
	      success: true,
	      docs: docs
	    });
	  });

	  return res;
	});
}

