var express = require('express');
var app = express();
var fs = require('fs');
//var passport = require('passport');
//var methodOverride = require('method-override');
//var session = require('express-session');
//var bodyParser = require('body-parser');

function ensureAuthenticated(req,res,next) {
  if(req.session.username) {
    next();
  } else { 
    res.redirect("/");
  }
}

function homePage(req,res) { 
 
 path = 'underConstruction.html';
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

  console.log("Node app got request to /login:");
  res.sendFile('essayPage.html', { root: 'public' }); 

}

function viewEssay(req,res){

  var id = req.params.id;
  if(id < 6) { 
  path = '/essayPages/essay'+id+'.html';
  console.log("Node app got request to /viewEssay/"+id);
  console.log("page served is " + path);
  res.sendFile(path, { root: 'public' });
  /*if(err){
handle404(err,req,res)
    } */
  }else{
    handle404(req,res);
  }

  

}

function handle404(req,res){
  
  res.sendFile('404.html', { root: 'public' }); 
}


app.set('port', (process.env.PORT || 5000));
//app.use(express.bodyParser());
//app.use(methodOverride());
//app.engine('jade', require('jade').__express);

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


app.use(express.static(__dirname + '/public'));

// 404 must be the last route 

app.get('*', handle404);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
