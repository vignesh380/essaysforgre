/**{app.routes.handleErrorRoutes.handle403
 * :[GET]} <br/><br/> Method to render the 403 error page
 * @exports handle403
 * @param {object} reqest 
 * @param {object} response 
 */

function handle403(req,res){
  res.sendFile('403.html', { root: 'public' }); 
}

/**{app.routes.handleErrorRoutes.handle404
 * :[GET]} <br/><br/> Method to render the 404 error page
 * @exports handle404
 * @param {object} reqest 
 * @param {object} response 
 */

function handle404(req,res){
  res.sendFile('404.html', { root: 'public' }); 
}

exports.handle403 = handle403;
exports.handle404 = handle404;