// app/routes.js

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

// expose the routes to our app with module.exports
module.exports = function(app,passport) {

  app.set('port', (process.env.PORT || 5000));

  // homePageRoutes ================================================================
  var homePageRoutes = App.route('homePageRoutes');
  app.get('/', homePageRoutes.homePage);
  app.get('/home',homePageRoutes.tempHomePage);

  // essayPageRoutes ===============================================================
  var essayPageRoutes = App.route('essayPageRoutes');
  app.get('/essay',essayPageRoutes.essayPage);

  // userProfilePageRoutes =========================================================
  var userProfilePageRoutes = App.route('userProfilePageRoutes');
  app.get('/profile',userProfilePageRoutes.userProfilePage);

  // viewEssayRoutes ===============================================================
  var viewEssayRoutes = App.route('viewEssayRoutes');
  app.get('/viewEssay/:id',viewEssayRoutes.viewEssay);

  // logoutPageRoutes ==============================================================
  var logoutPageRoutes = App.route('logoutPageRoutes');
  app.get('/logout',logoutPageRoutes.logout);

  // essayPoolRoutes ===============================================================
  var essayPoolRoutes = App.route('essayPoolRoutes');
  app.get('/addEssayTopic',essayPoolRoutes.showPage);
  app.post('/submit_to_essayPool',essayPoolRoutes.add);

  // loginPageRoutes ===============================================================
  var loginPageRoutes = App.route('loginPageRoutes');
  app.get('/login',loginPageRoutes.loginPage);
  app.post('/login',passport.authenticate('local-login', { 
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true })
  );

  // signUpPageRoutes ==============================================================
  var signUpPageRoutes = App.route('signUpPageRoutes');
  app.get('/signup',signUpPageRoutes.signUpPage);
  app.post('/signup',passport.authenticate('local-signup', { 
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true })
  );

  // Public Folder =================================================================
  app.use(express.static(App.appPath('/public')));

  // handleErrorRoutes =============================================================
  
  // 404 must be the last route 
  var handleErrorRoutes = App.route('handleErrorRoutes');
  app.get('*', handleErrorRoutes.handle404);

  //test
  app.all('/',function(req, res){
    req.flash('test','worked off maccha');
    res.redirect('/');
  })

};