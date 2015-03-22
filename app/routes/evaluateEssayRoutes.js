//apps/routes/evaluateEssayRoutes

var EssayModel = App.model('essay');
var ReviewEssayModel = App.model('reviewedEssay');
var UserRoutes = App.route('userProfilePageRoutes');

function findscore(questions,callback) { 
      //score finding alogorithm 
      return callback(6);
    }

function evaluateEssay(req,res) {

   var questions = [], i =1;
   questions[i++] = req.body.q1.value;
   questions[i++] = req.body.q2.value;
   questions[i++] = req.body.q3.value;
   questions[i++] = req.body.q4.value;
   questions[i++] = req.body.q5.value;
   questions[i++] = req.body.q6.value;
   findscore(questions,function(score) {
   		updateEssayStatus(req,res);
   		addReview(req,res,score);
   });
  }
function updateEssayStatus(req,res) {
	console.log('essay_id' + req.cookies.essay_id );
	EssayModel.findOne({'essay_id' : req.cookies.essay_id }, function(err, result) {
          if(err) {
            return done(err);
          }
          if(result) {
            EssayModel.update({'essay_id' : req.cookies.essay_id },{status : result.status + 1},function(err,updateResult){
              if(err){
                console.log("updating essay status failed");
              }
              console.log("successfully updated the status of the essay ");
            }); 
          } else {
          	 console.log("status of the essay failed");
          }
        });
}

function addReview(req,res,score){
	ReviewEssayModel.findOne({}).sort('-review_id').exec(function (err, result) {	
		if (err) {
			res.status(422).send('addRewiew:EssayModel:Problem: ' + err.message );
		} else {
			if(result){
			var  review = new ReviewEssayModel({
				 review_id: result.review_id + 1
				,essay_id: req.cookies.essay_id
				,userid: req.user.local.emailS
				,score: score
				,comments: req.body.comments.value
			});		
			} else { 
			var  review = new ReviewEssayModel({
				 review_id: 0
				,essay_id: req.cookies.essay_id
				,userid: req.user.local.email
				,score: score
				,comments: req.body.comments.value
			});			
			} 
			review.save(function(err) {
				if(err) {
					res.status(422).send('addRewiew:review:Problem: ' + err.message );
				} else {
					//update the coins
					UserRoutes.incrementUserCoins(req,res);
					res.status(200).send(' successfully Reviewed the essay :D <a href="/profile">go to the profile page </a>');
				}
			});
	}
	});
}

exports.evaluateEssay = evaluateEssay;