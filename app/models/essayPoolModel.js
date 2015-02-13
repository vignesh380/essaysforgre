var mongoose = require('mongoose');

var schema = mongoose.Schema({
	 // essaypool_id :String,
	 essay_type:String
	,essay_topic:String
});

var Model = mongoose.model('ItemTemplate',schema);

module.exports = Model;