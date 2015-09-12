var EssayModel = App.model('essay'); 
var UserModel = App.model('user');
var ReviewedEssayModel = App.model('reviewedEssay');

/**{app.routes.reviewEssayRoutes.homePage
 * :[GET]} <br/><br/> Method to render the home page
 * @exports getEssayForReview
 * @param {object} reqest 
 * @param {object} response 
 */
 function getEssayForReview(req,res) {

//nested query select * from essay where (select * from users where coins > 0);
//4 conditions
/*
  1) different user
  2) coins > 0
  3) essay status < 2
*/
//must take care not to evaluate user's ownessay
//review count < 2
   //EssayModel.findOneRandom({coins:{$gte : 0}}, function(error, result) {
    
      //populate 10 users with coins gt 10 
  
  ReviewedEssayModel.findOne({
  	status :  0
  	,userid : req.user.local.email
  }, function(error, reviewResult){
  	 if(error) {
        res.status(422).send('Problem: ' + error.message );
       } else if(reviewResult) { 
        	
        	console.log(reviewResult);
        	//retrieving essay from essay table which has the same essay id
        	EssayModel.findOne({
        		essay_id : reviewResult.essay_id
        	}, function(error, result){
			if(error) {
         		res.status(422).send('Problem: ' + error.message );
        	}
        		res.render('reviewEssay', {essayContent:result.essay_content});
        	})

       } else {

       	 EssayModel.findRandom({
       	  status  : { $lt: 2}
         ,userid  : { $ne :req.user.local.email}
       },{},{limit : 20}, function(error, result) {
         var essays = [];
         var uniqueEssays  = [];
         console.log(result);
    	 result.forEach(function(item){
      	 essays.push(item.userid);
       });
         UserModel.findOneRandom({
         userName : { $in: essays} 
         ,coins   : { $gt: 0} 
       } , function(error,userResult) {
         if(error) {
         res.status(422).send('Problem: ' + error.message );
        }  else if(userResult){
        var gotEssay; 
        console.log(userResult);
        result.forEach(function(item){
          if(item.userid == userResult.userName){
            gotEssay = item;
          }
        });
        console.log("essay got :" + gotEssay.essay_content);
        var minute = 60 * 1000; //1 min ;
        res.cookie('essay_id',gotEssay.essay_id,{ maxAge: minute});
        //callback(result); 
        res.render('reviewEssay', {essayContent:gotEssay.essay_content});
      } else {
      	//make call to the function again 
      	//res.redirect('/viewEssay');
        res.status(200).send('some shit error bro :/ ');
      	}
    	});
  	 });
	}
});
}

function addReview(req,res){
	ReviewEssayModel.findOne({}).sort('-review_id').exec(function (err, result) {	
		if (err) {
			res.status(422).send('addRewiew:EssayModel:Problem: ' + err.message );
		} else {
			if(result){
			var  review = new ReviewEssayModel({
				 review_id: result.review_id + 1
				,essay_id: req.cookies.essay_id
				,userid: req.user.local.emailS
				,score: 0
				,comments: ''
				,status: 0
			});		
			} else { 
			var  review = new ReviewEssayModel({
				 review_id: 0
				,essay_id: req.cookies.essay_id
				,userid: req.user.local.email
				,score: 0
				,comments: ''
				,status: 0
			});			
			} 
			review.save(function(err) {
				if(err) {
					res.status(422).send('addRewiew:review:Problem: ' + err.message );
				} else {
					//update the coins
					res.status(200).send(' successfully Reviewed the essay :D <a href="/profile">go to the profile page </a>');
					var evaluateEssayRoutes = App.route('evaluateEssayRoutes');
					evaluateEssayRoutes.updateEssayStatus(req,res);
				}
			});
	}
});
}

exports.getEssayForReview = getEssayForReview;
exports.addReview = addReview;

