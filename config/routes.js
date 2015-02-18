// app/routes.js

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');


function ensureAuthenticated(req,res,next) {
  
  // if user is authenticated in the session, carry on 
  if(req.isAuthenticated()) {
     return next();
  }

  //if they aren't redirect them to the home page  
    res.redirect("/");  
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

function logout(req , res) {
  req.logout();
  res.redirect('/');
}


function handle404(req,res){
  
  res.sendFile('404.html', { root: 'public' }); 
}

function userProfilePage(req,res){
  console.log("got post request from login page");
  res.sendFile('userProfile.html', { root: 'public' }); 
 /* res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("hi");*/
}

function signUpPage(req,res){
  console.log("got post request from login page");
  res.sendFile('signup.html', { root: 'public' }); 
 /* res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("hi");*/
}

// expose the routes to our app with module.exports

module.exports = function(app,passport) {
  
app.set('port', (process.env.PORT || 5000));

//app.use(express.bodyParser());
//app.use(methodOverride());
//app.engine('jade', require('jade').__express);

app.get('/newUser/:id', addToDatabase);
app.get('/', homePage);

app.get('/logout',logout);
app.get('/essay',essayPage);

app.get('/viewEssay/:id',viewEssay);
app.get('/home',tempHomePage);
app.get('/profile',userProfilePage);

var essayPoolRoutes = App.route('essayPoolRoutes');
app.get('/addEssayTopic',essayPoolRoutes.showPage);
app.post('/submit_to_essayPool',essayPoolRoutes.add);

app.post('/login',passport.authenticate('local-login', { 
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true })
);

app.get('/login',loginPage);
//app.post('/login',userProfilePage);

app.get('/signup',signUpPage);
app.post('/signup',passport.authenticate('local-signup', { 
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true })
);

app.use(express.static(App.appPath('/public')));

// 404 must be the last route 
app.get('*', handle404);

};