var EssayPool = App.model('essayPoolModel');

function addToEssayPool(req,res) {
	var essay = new EssayPool({
		essay_type:req.body.essay_type,
		essay_topic:req.body.essay_topic
	});	

	essay.save(function(err) {
		if(err) {
			res.status(422).send('Problem: ' + err.message );
		} else {
			res.status(200).send('Added to the pool successfully :D');
		}
	});
}

function showPage(req,res){
    console.log("Node app got request to /addEssayTopic :");
  res.sendFile('addEssayTopic.html', { root: 'public' }); 

}

exports.add = addToEssayPool;
exports.showPage = showPage;

