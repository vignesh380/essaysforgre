var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var schema = mongoose.Schema({
	 essaypool_id :Number,
	 essay_type:String,
	 essay_topic:String
});

schema.plugin(random);

var Model = mongoose.model('EssayPool',schema);

module.exports = Model;