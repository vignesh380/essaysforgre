/**{app.routes.signinPageRoutes.loginPage
 * :[GET]} <br/><br/> Method to render the login page
 * @exports loginPage
 * @param {object} reqest 
 * @param {object} response 
 */
function loginPage(req,res){

  console.log("Node app got request to /login:");
  res.sendFile('login.html', { root: 'public' }); 
}

exports.loginPage = loginPage;