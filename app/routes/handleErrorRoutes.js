function handle404(req,res){
  res.sendFile('404.html', { root: 'public' }); 
}

exports.handle404 = handle404;