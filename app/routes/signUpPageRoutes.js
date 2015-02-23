function signUpPage(req,res){
  console.log("got post request from login page");
  res.sendFile('signup.html', { root: 'public' }); 
}

exports.signUpPage = signUpPage;
