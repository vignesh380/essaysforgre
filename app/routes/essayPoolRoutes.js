var EssayPool = App.model('essayPoolModel');

function addToEssayPool(req,res) {
	var essay = new EssayPool({
		essaypool_id:req.body.essaypool_id,
		essay_type:req.body.essay_type,
		essay_topic:req.body.essay_topic
	});	
console.log("essaypool_id : " + essay.essapool_id);


	findlatestID(essay);

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

function findlatestID(essay){

	var id = essay.findOne({} , 'essaypool_id' , sort({essaypool_id : 'desc' }), function (err, person) {
  	if (err) {
  	res.status(422).send('Problem: ' + err.message );
  } else {
  	id++; //increment it 
  	essay.essaypool_id = id ;// set it back to essaypool_id
  }
});
}

exports.add = addToEssayPool;
exports.showPage = showPage;

