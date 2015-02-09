// app/routes.js

var express = require('express');
var fs = require('fs');

function test(){
  //duh !!! it does nothing :/
}
function ensureAuthenticated(req,res,next) {
  if(req.session.username) {
    next();
  } else { 
    res.redirect("/");
  }
}

function homePage(req,res) { 
 
 path = 'underConstruction.html';
 //path = 'underConstruction.html';
 console.log("serving /" + path);
 res.sendFile(path, { root: 'public' }); 
}

function tempHomePage(req,res) { 
 
 path = 'startPage.html';
 console.log("serving /" + path);
 res.sendFile(path, { root: 'public' }); 
}

function loginPage(req,res){

  console.log("Node app got request to /login:");
  res.sendFile('login.html', { root: 'public' }); 
}

function essayPage(req,res){

  console.log("Node app got request to /essay :");
  res.sendFile('essayPage.html', { root: 'public' }); 
}

function viewEssay(req,res){

  var id = req.params.id;
  if(id < 6) { 
  path = '/essayPages/essay'+id+'.html';
  console.log("Node app got request to /viewEssay/"+id);
  console.log("page served is " + path);
  res.sendFile(path, { root: 'public' });
  }else{
    handle404(req,res);
  }
}

function addToDatabase(req,res){
  var id = req.params.id;
  myObject.name = id;
  myObject.save(function (err,myObject){
    if (err) {return console.error(err);
    }
    myObject.logger();
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("Added " + id +" to db");
}

function handle404(req,res){
  
  res.sendFile('404.html', { root: 'public' }); 
}

// expose the routes to our app with module.exports

module.exports = function(app) {

//app.set('port', (process.env.PORT || 5000));
//app.use(express.bodyParser());
//app.use(methodOverride());
//app.engine('jade', require('jade').__express);

app.get('/newUser/:id', addToDatabase);
app.get('/', homePage);
app.get('/login',loginPage);
app.get('/essay',essayPage);
app.get('/viewEssay/:id',viewEssay);
app.get('/home',tempHomePage);

/*app.post('/login',passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true })
);*/

app.post('/login',function(req,res){
  console.log("got post request from login page");
  res.sendFile('userProfile.html', { root: 'public' }); 
 /* res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("hi");*/
});

console.log("public directory in : "+ __dirname + '/public');
app.use(express.static(__dirname + '/public'));

// 404 must be the last route 
app.get('*', handle404);

};