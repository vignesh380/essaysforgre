  var env 		  = process.env.NODE_ENV || 'development'
	, packageJson = require ('../package.json')
	, path 		  = require('path')
	, express     = require('express');

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
		return this.require("app/utils/" + path)
	}
}


//App.app.use(express.cookieParser());
//App.app.use(express.cookieSession({secret: "essaysforgreessayBody", key: "session"}));
//App.app.use(express.static(App.appPath('Public')));

console.log('gonna call routes');

//when everything is fixed properly this line to be used :
App.require("config/routes")(App.app);
//App.require("routes")(App.app);
/*if(env != 'development'){
	App.require("config/routes")(App.app);
} else {
	//do nothing
}*/

//Database setup

//uncomment below later 
//App.require('config/database')(process.env.DATABASE_URL || 'mongodb://localhost/nodeslash_development');
