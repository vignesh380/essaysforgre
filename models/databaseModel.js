// app/models/databaseModel.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');

    var myScheme = mongoose.Schema({
    	name:String
    });
    myScheme.methods.logger = function () { 
    	var gotName = this.name ? "Logger got name " + this.name 
    	: "Logger got no name :/";
    	console.log(gotName);
    }
    module.exports = mongoose.model('uniqueName',myScheme);