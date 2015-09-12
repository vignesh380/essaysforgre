var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var schema = mongoose.Schema({
	 review_id: Number
	,essay_id: Number
	,userid:String
	,status:String
	,score: Number
	,comments: String
	,status : Number
});

schema.plugin(random);

var Model = mongoose.model('reviewed_essay',schema);

module.exports = Model;