var EssayModel = App.model('essay');
var UserModel = App.model('user');

function viewEssay(req,res){

  var handleErrorRoutes = App.route('handleErrorRoutes');
  var id = req.params.id;
  if(id < 6) { 
  path = '/essayPages/essay'+id+'.html';
  console.log("Node app got request to /viewEssay/"+id);
  console.log("page served is " + path);
  res.sendFile(path, { root: 'public' });
  }else{
    handleErrorRoutes.handle404(req,res);
  }
}

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
    result.forEach(function(item){
      essays.push(item.userid);
    });
    console.log(essays);
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
        var minute = 60 * 1000; //1 min 
        res.cookie('essay_id',gotEssay.essay_id,{ maxAge: minute});
        //callback(result); 
        res.sendFile('evaluateEssayTemp.html', { root: 'public' });
      } else {
        res.status(200).send('some shit error bro :/ ');
      }
    });
  });
}

exports.getEssayForReview = getEssayForReview;
exports.viewEssay = viewEssay;