var User = App.model('user');

/**{app.routes.userProfilePageRoutes.homePage
 * :[POST]} <br/> Method to render the profile page upon sucessful login.
 * @exports userProfilePage
 * @param {object} reqest 
 * @param {object} response 
 */

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

/**{app.routes.userProfilePageRoutes.decrementUserCoins
 * :[internal_method]} <br/> Method to decrement the user's coins after user submits an essay.
 * @exports decrementUserCoins
 * @param {object} reqest 
 * @param {object} response 
 */

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

/**{app.routes.userProfilePageRoutes.incrementUserCoins
 * :[internal_method]} <br/> Method to increment the user's coins after user rewiews the essay.
 * @exports incrementUserCoins
 * @param {object} reqest 
 * @param {object} response 
 */

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