var essayPoolRoutes = App.route('essayPoolRoutes');
var EssayModel = App.model('essay');

function essayPage(req,res) {
	console.log("Node app got request to /essay :");
  	//uncomment below later
  	//var essay = essayPoolRoutes.getEssayTopicFromPool(req.body.essay_type);
  	essayPoolRoutes.getEssayTopicFromPool('issue', function(essay) {
  		console.log('got the essay with topic :' + essay.essay_topic + " with id : " + essay.essaypool_id);
  		var minute = 30 * 60 * 1000; //30 min 
  		res.cookie('essaypool_id',essay.essaypool_id,{ maxAge: minute});
  		//update the essaypage with the recently got essaytopic 
  		//addlines here
  		res.sendFile('essayPage.html', { root: 'public' }); 
  	}); 	
}

function submitEssay(req,res) {
	console.log('pushing to db with user id:' + req.user.local.email );
	EssayModel.findOne({}).sort('-essay_id').exec(function (err, result) {	
		if (err) {
			res.status(422).send('Problem: ' + err.message );
		} else {
			if(result){
			var  essay = new EssayModel({
				 essay_id:result.essay_id + 1
				,essaypool_id:req.cookies.essaypool_id
				,userid: req.user.local.email
				,status: 'NR'
				,essay_content: req.body.essay_content
			});		
			} else { 
			var  essay = new EssayModel({
				 essay_id: 0
				,essaypool_id:req.cookies.essaypool_id
				,userid: req.user.local.email
				,status: 'NR'
				,essay_content: req.body.essay_content
			});			
			} 
			essay.save(function(err) {
				if(err) {
					res.status(422).send('Problem: ' + err.message );
				} else {
					res.status(200).send('Added the essay successfully :D <a href="/profile">go to the profile page </a>');
				}
			});
	}
	});	

}

exports.essayPage = essayPage;
exports.submitEssay = submitEssay;
