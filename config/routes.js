// app/routes.js

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

// expose the routes to our app with module.exports
module.exports = function(app,passport) {
  app.set('port', (process.env.PORT || 5000));
  app.set('view engine','jade');

  //test routes

  app.get('/index',function(req,res){
    res.sendFile('index.html', { root: 'public' });
  });

  // homePageRoutes ================================================================
  var homePageRoutes = App.route('homePageRoutes');
  app.get('/', homePageRoutes.homePage);
  app.get('/home',homePageRoutes.tempHomePage);

  // essayPageRoutes ===============================================================
  var ensureAuthenticated = App.middleware('ensureAuthenticated');
  // app.all('/app/*',ensureAuthenticated.ensureAuthenticated);

  // essayPageRoutes ===============================================================
  var essayPageRoutes = App.route('essayPageRoutes');
  app.get('/app/essay',essayPageRoutes.essayPage);
  app.post('/app/essay',essayPageRoutes.submitEssay);

  // essayReviewPage ===============================================================
  app.get('/app/review', function(req,res){
     res.sendFile('sliders.html', { root: 'public' });
  });

  // userProfilePageRoutes =========================================================
  var userProfilePageRoutes = App.route('userProfilePageRoutes');
  app.get('/app/profile', function(req,res) {
    res.sendFile('ProfilePage.html', { root : 'public' });
  });
  //  TODO uncomment the below line later.
  //app.get('/app/profile',userProfilePageRoutes.userProfilePage);

  // viewEssayRoutes ===============================================================
  var viewEssayRoutes = App.route('viewEssayRoutes');
 // app.get('/viewEssay/:id',viewEssayRoutes.tempViewEssay);
  // must change below route once completly implemented
  var reviewEssayRoutes = App.route('reviewEssayRoutes');
  app.get('/app/viewEssay',reviewEssayRoutes.getEssayForReview);

  // logoutPageRoutes ==============================================================
  var logoutPageRoutes = App.route('logoutPageRoutes');
  app.get('/logout',logoutPageRoutes.logout);
  app.get('/signout',logoutPageRoutes.logout);

  // essayPoolRoutes ===============================================================
  var essayPoolRoutes = App.route('essayPoolRoutes');
  app.get('/app/addEssayTopic',essayPoolRoutes.essayPoolPage);
  app.post('/app/submit_to_essayPool',essayPoolRoutes.add);

  // SigninPageRoutes ==============================================================
  var signinPageRoutes = App.route('signinPageRoutes');
  app.get('/signin',signinPageRoutes.loginPage);
  app.get('/login',signinPageRoutes.loginPage);
  app.post('/login',passport.authenticate('local-login', {
    successRedirect: '/app/profile',
    failureRedirect: '/login',
    failureFlash: true })
  );

  // signUpPageRoutes ==============================================================
  var signUpPageRoutes = App.route('signUpPageRoutes');
  app.get('/signup',signUpPageRoutes.signUpPage);
  app.post('/signup',passport.authenticate('local-signup', {
    successRedirect: '/app/profile',
    failureRedirect: '/signup',
    failureFlash: true })
  );

  // EvaluateEssayScoreRoutes ======================================================
  var evaluateEssayRoutes = App.route('evaluateEssayRoutes');
  app.post('/app/evaluateEssay',evaluateEssayRoutes.evaluateEssay);

  // Public Folder =================================================================
  app.use(express.static(App.appPath('/public')));

  // handleErrorRoutes =============================================================
  // 404 must be the last route
  var handleErrorRoutes = App.route('handleErrorRoutes');
  app.get('/error/403',handleErrorRoutes.handle403);
  app.get('*', handleErrorRoutes.handle404);


  //test
  app.all('/',function(req, res){
    req.flash('test','worked off maccha');
    res.redirect('/');
  })

};
