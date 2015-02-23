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

exports.viewEssay = viewEssay;