// config/passport.js


var LocalStrategy = require('passport-local').Strategy
  , User 		   = App.model('user');

  module.exports = function(passport) {

  	//used to serialize the user for the session
  	passport.serializeUser(function(user, done) {
  		done(null,user.id);
  	});

  	//used to deserialize the user
  	passport.deserializeUser(function(id, done) {
  		User.findById(id,function(err, user) {
  			done(err,user);
  		});
  	});

  	//local signup
  	passport.use('local-signup', new LocalStrategy({

  		usernameField: 'email',
  		passwordField: 'password',
  		passReqToCallback: true //allows us to pass back the entire request to the callback
  	},
  	function(req, email, password, done) {
  		
  		process.nextTick(function(){
  			User.findOne({'local.email' : email}, function(err, user) {
  				if(err) {
  					return done(err);
  				}
  				if(user) {
  					return done(null, false, req.flash('signupMessage', 'That email is already taken'))
  				} else {
  					//create the user

  					var newUser = new User();

  					newUser.local.email    = email;
  					newUser.local.password = newUser.generateHash(password);

  					//save to DB

  					newUser.save(function(err) {
  						if (err){
  							throw err;
  						}
  						return done(null, newUser);
  					}); 
  				}
  			});
  		});
  	}));


//local login
  	passport.use('local-login', new LocalStrategy({

  		usernameField: 'email',
  		passwordField: 'password',
  		passReqToCallback: true //allows us to pass back the entire request to the callback
  	},
  	function(req, email, password, done) {
	
		User.findOne({'local.email' : email}, function(err, user) {
			if(err) {
				return done(err);
			}
			if(!user) {
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			} 

			//if user is found bu the password is wrong
			if(!user.validatePassword(password)){
				return done(null, false , req.flash('loginMessage', 'Oops! Wrong password.'));  					
			}

			//all is well, return sucessful user

			return done(null, user);
		});
	
  	}));  	
  };
