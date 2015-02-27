function loginPage(req,res){

  console.log("Node app got request to /login:");
  res.sendFile('login.html', { root: 'public' }); 
}

exports.loginPage = loginPage;