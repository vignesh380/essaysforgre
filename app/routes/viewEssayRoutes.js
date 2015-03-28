var EssayModel = App.model('essay');
var UserModel = App.model('user');
var reviewEssayRoutes = App.route('reviewEssayRoutes');


/**{app.routes.viewEssayRoutes.tempViewEssay
 * :[GET]} <br/><br/> *!!TEMP METHOD* Method to view an essay for review.
 * @param {object} reqest 
 * @param {object} response 
 * @exports tempViewEssay
 */
function tempViewEssay(req,res){

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

  /**{app.routes.viewEssayRoutes.viewEssay
 * :[GET]} <br/><br/> Method to view an essay for review.
 * @param {object} reqest 
 * @param {object} response 
 * @exports viewEssay
 */
function viewEssay(req,res){
//as of now a placeholder for the main code to be writen here

reviewEssayRoutes.getEssayForReview(req,res);

}

exports.viewEssay = viewEssay;
exports.viewEssay = tempViewEssay;