var User = App.model('user');

function userProfilePage(req,res){
  console.log("got post request from login page");
  User.findOne({'local.email' : req.user.local.email}, function(err, result) {
  				if(err) {
  					return done(err);
  				}
  				if(result) {
  					res.render('ProfilePage', { user:result.name}); 
  				} 
  			});
}

function decrementUserCoins(req,res){
  User.findOne({'local.email' : req.user.local.email}, function(err, result) {
          if(err) {
            return done(err);
          }
          if(result) {
            User.update({'local.email' : req.user.local.email},{coins : result.coins - 1},function(err,updateResult){
              if(err){
                console.log("updating coins failed")
              }
              console.log("successfully updated the coins for the user");
            }); 
          } 
        });
}

function incrementUserCoins(req,res){
  User.findOne({'local.email' : req.user.local.email}, function(err, result) {
          if(err) {
            return done(err);
          }
          if(result) {
            User.update({'local.email' : req.user.local.email},{coins : result.coins + 1},function(err,updateResult){
              if(err){
                console.log("updating coins failed")
              }
              console.log("successfully updated the coins for the user");
            }); 
          } 
        });
}

exports.userProfilePage = userProfilePage;
exports.decrementUserCoins = decrementUserCoins;
exports.incrementUserCoins = incrementUserCoins;