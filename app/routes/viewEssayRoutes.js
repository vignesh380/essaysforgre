var EssayModel = App.model('essay');

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

//must take care not to evaluate user's ownessay
//review count < 2
   //EssayModel.findOneRandom({coins:{$gte : 0}}, function(error, result) {

    EssayModel.findOneRandom({status : { $gt: 0, $lt: 2},
      userid : {$ne : req.user.local.email}}
      //)
    //.where('status').gt(0).lt(2)
    //.where('userid').notequal(req.user.local.email)
    //.exec( 
      , 
      function(error, result) {
    if(error) {
      res.status(422).send('Problem: ' + err.message );
    } else if(result){
      console.log("essay got :" + result.essay_content);
      var minute = 60 * 1000; //30 min 
      res.cookie('essay_id',result.essay_id,{ maxAge: minute});
      //callback(result); 
      res.sendFile('evaluateEssayTemp.html', { root: 'public' });
    } else {
      res.status(200).send('A Test case where the coin is 0. will not happen in live mostly :P ');
    }
  });
}

exports.getEssayForReview = getEssayForReview;
exports.viewEssay = viewEssay;