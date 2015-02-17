var EssayPool = App.model('essayPoolModel');
var latestID = 0 ;
function addToEssayPool(req,res) {

	EssayPool.findOne({}).sort('-essaypool_id').exec(function (err, result) {
		
		if (err) {
			res.status(422).send('Problem: ' + err.message );
		} else {
			var essay = new EssayPool({
				essaypool_id: result.essaypool_id + 1,
				essay_type:req.body.essay_type,
				essay_topic:req.body.essay_topic
			});		
			essay.save(function(err) {
				if(err) {
					res.status(422).send('Problem: ' + err.message );
				} else {
					res.status(200).send('Added to the pool successfully :D <a href="/addEssayTopic">go back </a>');
				}
			});
		}
	});	
}

function showPage(req,res){
    console.log("Node app got request to /addEssayTopic :");
  res.sendFile('addEssayTopic.html', { root: 'public' }); 

}

exports.add = addToEssayPool;
exports.showPage = showPage;

