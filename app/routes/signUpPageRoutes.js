/**{app.routes.signUpPageRoutes.signUpPage
 * :[GET]} <br/><br/> Method to render the home page
 * @exports signUpPage
 * @param {object} reqest 
 * @param {object} response 
 */

function signUpPage(req,res){
  console.log("got post request from login page");
  res.sendFile('signup.html', { root: 'public' }); 
}

exports.signUpPage = signUpPage;
