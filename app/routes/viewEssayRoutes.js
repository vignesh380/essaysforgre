var EssayModel = App.model('essay');

function viewEssay(req,res){

  var handleErrorRoutes = App.route('handleErrorRoutes');
  var id = req.params.id;
  if(id < 6) { 
  path = 'reviewEssay.html';
  console.log("Node app got request to /viewEssay");
  console.log("page served is " + path);
  res.sendFile(path, { root: 'public' });
  }else{
    handleErrorRoutes.handle404(req,res);
  }
}

function getEssayForReview(req,res) {

//nested query select * from essay where (select * from users where coins > 0);

//must take care not to evaluate user's ownessay
//review count < 2
   //EssayModel.findOneRandom({coins:{$gte : 0}}, function(error, result) {

    EssayModel.findOneRandom({},function(error, result) {
    if(error) {
      res.status(422).send('Problem: ' + err.message );
    } else if(result){
      console.log("essay got :" + result.essay_content);
      var minute = 60 * 1000; //30 min 
      res.cookie('essay_id',result.essay_id,{ maxAge: minute});
      //callback(result); 
      res.render('reviewEssay', {essayContent:result.essay_content}); 
      //res.sendFile('reviewEssay.html', { root: 'public' });
    } else {
      res.status(200).send('A Test case where the coin or no essays to be reviewed is 0. will not happen in live mostly :P ');
    }
  });
}

exports.getEssayForReview = getEssayForReview;
exports.viewEssay = viewEssay;