module.exports = function(router){
	app.get('/', homePage);
	app.get('/login',loginPage);
/*app.post('/login',function(req,res){

  console.log("got post request from login page");
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("hi");
});*/
app.post('/login',passport.authenticate('local', { 
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true })
);
app.use(express.static(__dirname + '/public'));
}

function homePage(req,res) { 
	path = '/index.html';
  /*fs.readFile(__dirname + path, function(err, data){
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data, 'utf8');
      res.end();
    }
});*/

console.log("serving " + path);
res.sendFile('startPage.html', { root: 'public' }); 
}

function loginPage(req,res){
	console.log("Node app got request to /login:");
	res.sendFile('login.html', { root: 'public' }); 

}