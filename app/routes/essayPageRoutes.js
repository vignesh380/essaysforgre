var essayPoolRoutes = App.route('essayPoolRoutes');
var EssayModel = App.model('essay');
var UserRoutes = App.route('userProfilePageRoutes');


/**{app.routes.essayPageRoutes.essayPage
 * :[GET]} <br/><br/> Method to render the essayPage
 * it calls {@link essayPoolRoutes}.getEssayTopicFromPool() to get an essaytopic.
 * the cookie and timer is set for 30 min for the test time .
 * @exports essayPage
 * @param {object} reqest 
 * @param {object} response 
 */
function essayPage(req,res) {
	console.log("Node app got request to /app/essay :");
	//res.sendFile('essayPage.html', { root: 'public' });
  	//uncomment below later
  	essayPoolRoutes.getEssayTopicFromPool(req.query.essayType, function(essay) {
  		var essayType = req.query.essayType;
  		console.log(essayType);
  		console.log('got the essay with topic :' + essay.essay_topic + " with id : " + essay.essaypool_id);
  		var minute = 30 * 60 * 1000; //30 min 
  		res.cookie('essaypool_id',essay.essaypool_id,{ maxAge: minute});
  		//update the essaypage with the recently got essaytopic 
  		//addlines here
  		//res.sendFile('essayPage.html', { root: 'public' }); 
  		res.render('essayPage', {essay_topic : essay.essay_topic}); 
  		
  	}); 	
}

function instructionPage(req,res){
	if (req.query.essayType == 'issue') {
	
		res.sendFile('instructions.html',{root : 'public'});

	}
	else{
		res.sendFile('instructions-arg.html',{root : 'public'});	
	}
	
}

/**{app.routes.essayPageRoutes.submitEssay 
 * :[POST]} <br/><br/> Method to submit the essay to the database
 * it calls {@link UserRoutes}.decrementUserCoins() to decrement that users's Coin.
 * Next the essay is pushed to the database 
 * @exports submitEssay
 * @param {object} reqest 
 * @param {object} response 
 */
function submitEssay(req,res) {

	//first decrease the coins of the the user
	UserRoutes.decrementUserCoins(req,res);
	//now push the essay to the DB
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
				,status: 0
				,essay_content: req.body.essay_content
			});		
			} else { 
			var  essay = new EssayModel({
				 essay_id: 0
				,essaypool_id:req.cookies.essaypool_id
				,userid: req.user.local.email
				,status: 0
				,essay_content: req.body.essay_content
			});			
			} 
			essay.save(function(err) {
				if(err) {
					res.status(422).send('Problem: ' + err.message );
				} else {
					res.status(200).send('Added the essay successfully :D <a href="/app/profile">go to the profile page </a>');
				}
			});
	}
	});	

}

exports.essayPage = essayPage;
exports.submitEssay = submitEssay;
exports.instructionPage = instructionPage;
