function userProfilePage(req,res){
  console.log("got post request from login page");
  res.sendFile('Profilepage.html', { root: 'public' }); 
}

exports.userProfilePage = userProfilePage;