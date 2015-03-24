// app/models/user.js

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var random   = require('mongoose-simple-random');

//define the schema for user model 

var userSchema = mongoose.Schema({

	local			: {
		email		: String,
		password	: String
	},
	facebook		: {
		id			: String,
		token		: String,
		email		: String,
		name		: String
	},
	twitter			: {
		id			: String,
		token		: String,
		displayName : String,
		userName    : String
	},
	google			: {
		id			: String,
		token		: String,
		email		: String,
		name 		: String
	},
	name            : String,
	coins 			: Number,
	userName    	: String,
});

// plugin for random record 
userSchema.plugin(random);

// methods ========================================

//generate a hash 
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

//check if the password is valid 
userSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password,this.local.password);
};

module.exports = mongoose.model('User' , userSchema);