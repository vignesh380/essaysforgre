  var env 		   = process.env.NODE_ENV || 'development'
	, packageJson  = require ('../package.json')
	, path 		   = require('path')
	, express      = require('express')
	, passport     = require('passport')
	, flash        = require('connect-flash') 

	, cookieParser = require('cookie-parser')
	, bodyParser   = require('body-parser')
	, session 	   = require('express-session');

console.log('Loading App in ' + env +' mode.');

global.App = {
	  app: express()
	, port: process.env.PORT || 5000
	, version: packageJson.version
	, root: path.join(__dirname,'..')
	, appPath: function(path) {
		return this.root + '/' + path;
	}
	, require: function(path) {
		return require(this.appPath(path));
	}
	, env:env
	, start : function(){
		if (!this.started) {
			this.started = true;
			this.app.listen(this.port);
			console.log("running the app version " + App.version + " on port " + App.port + " in " + App.env + " mode");	
		}
	}
	, model: function(path){
		return this.require("app/models/" + path);
	}
	, route: function(path) {
		return this.require("app/routes/" + path);
	}
	, util: function(path) {
		return this.require("app/utils/" + path);
	}
	, middleware: function(path) {
		return this.require("app/middlewares/" + path);
	}
}

// configuration ========================================================================
App.app.use(cookieParser()); // read cookies (needed for auth)

// get info from html forms
App.app.use(bodyParser.urlencoded({
  extended: true
}));
App.app.use(bodyParser.json());


// required for passport  
App.app.use(session({secret: 'essaysforgreessayBodysecret'}));// session secret
App.app.use(passport.initialize());
App.app.use(passport.session()); // persistent login sessions
App.app.use(flash()); // use connect-flash for flash messages stored in sessions


// passport ============================================================================
App.require("config/passport")(passport);

// routes ==============================================================================
console.log('gonna call routes');
App.require("config/routes")(App.app , passport);

// Database configuration ==============================================================
App.require('config/database')
('mongodb://liveconnect:liveconnect@ds031531.mongolab.com:31531/heroku_app32320230'); 
