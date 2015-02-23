function essayPage(req,res){
  console.log("Node app got request to /essay :");
  res.sendFile('essayPage.html', { root: 'public' }); 
}

exports.essayPage = essayPage;