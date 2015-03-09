function userProfilePage(req,res){
  console.log("got post request from login page");
  var User=App.model('user');
  User.findOne({'local.email' : req.user.local.email}, function(err, result) {
  				if(err) {
  					return done(err);
  				}
  				if(result) {
  					res.render('ProfilePage', { user:result.name}); 
  				} 
  			});
}

exports.userProfilePage = userProfilePage;