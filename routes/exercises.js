import monk from 'monk';
import _ from 'lodash';
const db = monk('localhost:27017/gym');

export default function(router) {
	router.get('/:programId', function(req, res) {
    const { programId } = req.params;
    const collection = db.get('exercises');
	  collection.find({program_id: programId}, function(e, docs) {
	    res.json(docs);
	  });
	});

  router.post('/', function(req, res) {
      const { programId, name, ...days } = req.body;
      const workoutDays = _.map(days, (value, prop) => {
          return { [prop]:value };
      });
      const collection = db.get('exercises');
      collection.insert(
      {
        name,
        program_id: programId,
        workoutDays
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

