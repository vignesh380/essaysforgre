//apps/routes/evaluateEssayRoutes

var EssayModel = App.model('essay');
var ReviewEssayModel = App.model('reviewedEssay');
var UserRoutes = App.route('userProfilePageRoutes');

/**{app.routes.evaluateEssayRoutes.findScore:
 * [internal_method]} <br/><br/> Method to find the score of the essay based on the review is sunmitted .
 * @module findScore
 * @param {array} array array of values for 6 questions asked to the reviewer. 
 * @param {function} callback 
 */
function findScore(questions,callback) { 
      //score finding alogorithm 
      return callback(6);
    }

/**{app.routes.evaluateEssayRoutes.evaluateEssay
 * :[POST]} <br/><br/> Method does 3 thing.
 * <br/> 1) call to {@link findScore} to determine the score
 * <br/> 2) increment the EssayStatus by one for the review
 * <br/> 3) add the review to the ReviewEssay table.
 * @exports evaluateEssay
 * @param {object} request
 * @param {object} response 
 */
function evaluateEssay(req,res) {

   var questions = [], i =1;
   questions[i++] = req.body.q1.value;
   questions[i++] = req.body.q2.value;
   questions[i++] = req.body.q3.value;
   questions[i++] = req.body.q4.value;
   questions[i++] = req.body.q5.value;
   questions[i++] = req.body.q6.value;
   findScore(questions,function(score) {
   		updateEssayStatus(req,res);
   		addReview(req,res,score);
   });
  }

/**{app.routes.evaluateEssayRoutes.updateEssayStatus:
 * [internal_method]} <br/><br/> Method to update the Essay status of the essay after the review.
 * @memberOf evaluateEssayRoutes
 * @param {object} request 
 * @param {object} response 
 */

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


/**{app.routes.evaluateEssayRoutes.addReview:
 * [internal_method]} <br/><br/> Method to add the review to the ReviewEssay table.
 * @module addReview
 * @param {object} request 
 * @param {object} response 
 * @param {Number} score
 */

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