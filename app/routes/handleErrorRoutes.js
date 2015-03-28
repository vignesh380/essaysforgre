/**{app.routes.handleErrorRoutes.handle404
 * :[GET]} <br/><br/> Method to render the 404 error page
 * @exports handle404
 * @param {object} reqest 
 * @param {object} response 
 */

function handle404(req,res){
  res.sendFile('404.html', { root: 'public' }); 
}

exports.handle404 = handle404;