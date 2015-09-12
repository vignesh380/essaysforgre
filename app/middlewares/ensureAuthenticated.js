function ensureAuthenticated(req,res,next) {
  
  // if user is authenticated in the session, carry on 
  if(req.isAuthenticated()) {
     return next();
  }

  //if they aren't redirect them to the 403 page  
    res.redirect("/error/403");  
}

exports.ensureAuthenticated = ensureAuthenticated;