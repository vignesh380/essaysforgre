var mongoose = require('mongoose');


var schema = mongoose.Schema({
	 essay_id: Number
	,essaypool_id: Number
	,userid:String
	,status: String
	,essay_content: String
});

var Model = mongoose.model('Essay',schema);

module.exports = Model;