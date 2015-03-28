var EssayModel = App.model('essay'); 
var UserModel = App.model('user');

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
  EssayModel.findRandom({
       status  : { $lt: 2}
      ,userid  : { $ne :req.user.local.email}
    },{},{limit : 20}, function(error, result) {
    var essays = [];
    var uniqueEssays  = [];
    result.forEach(function(item){
      essays.push(item.userid);
    });
    UserModel.findOneRandom({
        userName : { $in: essays} 
      , coins    : { $gt: 0} 
    } , function(error,userResult) {
      if(error) {
        res.status(422).send('Problem: ' + err.message );
      } else if(userResult){
        var gotEssay; 
        result.forEach(function(item){
          if(item.userid == userResult.userName){
            gotEssay = item;
          }
        });
        console.log("essay got :" + gotEssay.essay_content);
        var minute = 60 * 1000; //1 min ;
        res.cookie('essay_id',gotEssay.essay_id,{ maxAge: minute});
        //callback(result); 
        res.sendFile('evaluateEssayTemp.html', { root: 'public' });
      } else {
      	//make call to the function again 
      	//res.redirect('/viewEssay');
        res.status(200).send('some shit error bro :/ ');
      }
    });
  });
}

exports.getEssayForReview = getEssayForReview;

