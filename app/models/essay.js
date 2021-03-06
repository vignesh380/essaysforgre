var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var schema = mongoose.Schema({
	 essay_id: Number
	,essaypool_id: Number
	,userid:String
	,status: Number
	,essay_content: String
});

schema.plugin(random);

var Model = mongoose.model('Essay',schema);

module.exports = Model;