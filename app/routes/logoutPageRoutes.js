/**{app.routes.logoutPageRoutes.logout
 * :[GET]} <br/><br/> Method to render the home page
 * @exports logout
 * @param {object} reqest 
 * @param {object} response 
 */

function logout(req , res) {
  req.logout();
  res.redirect('/');
}
exports.logout = logout;