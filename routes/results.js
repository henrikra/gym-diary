import monk from 'monk';
const db = monk('localhost:27017/gym');

export default function(router) {
	router.get('/', function(req, res) {
	  const { exerciseId } = req.query;

	  const collection = db.get('results');
	  collection.find({exercise_id: exerciseId}, {sort: {date: -1}}, function(err, docs) {
	    res.json({
	      success: true,
	      docs: docs
	    });
	  });
	});

	router.post('/', function(req, res) {
	  const { exerciseId, results } = req.body;
	  const collection = db.get('results');
	  collection.insert(
	    {
	      exercise_id: exerciseId,
	      date: new Date(),
	      sets: JSON.parse(results)
	    },
	    function(err, doc) {
	      if (err) {
	        console.log(err);
	        return res.status(500).send(err);
	      }
	      res.json({
	      	success: true,
	      	doc
	      });
	    }
	  );
	});

	router.delete('/:resultId', function(req, res) {
	  const { resultId } = req.params;
	  const collection = db.get('results');
	  collection.remove({_id: resultId}, function(err) {
	  	if (err) {
	  		console.log(err);
	  		return res.status(500).send(err);
	  	}
	    res.json({
	      success: true
	    });
	  });
	});
}

