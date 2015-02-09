var express = require('express');
var app = express();
var fs = require('fs');

//var database = require('./config/database');

var routes = require('./config/routes');
/*old code 
//----------------------------experimental code

mongoose.connect(database.url);
var myModel,myObject;
var myModel = require('./models/databaseModel');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error :'));
db.once('open',function(callback){
  
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

//----------------------------experimental code end 

//var passport = require('passport');
//var methodOverride = require('method-override');
//var session = require('express-session');
//var bodyParser = require('body-parser');
*/

require('./config/application')
App.start();

/*if(App.env != 'development'){
//pass this app context to routes file.
routes(app);
}else{
	
}*/
/* //old code 
//------------server code 
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
*/




