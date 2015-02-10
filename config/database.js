// config/database.js

var mongoose = require('mongoose');

function connect(connectionString) { 
	mongoose.connect(connectionString);

	var db = mongoose.connection;
	db.on('error',console.error.bind(console,'connection error :'));
	db.once('open',function(callback){
		console.log('Mongoose connected at: ', connectionString);
		myObject = new myModel({name: 'Viggy'});
   myObject.save(function (err,myObject){
    if (err) {return console.error(err);
    }
    myObject.logger();
  });
  myModel.find(function(err,myObjects){
    if (err) return console.error(err);
    console.log(myObjects);
  });
	});
}
module.exports = connect;