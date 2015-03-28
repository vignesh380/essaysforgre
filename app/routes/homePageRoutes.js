
/**{app.routes.homePageRoutes.homePage
 * :[GET]} <br/><br/> Method to render the home page
 * @exports homePage
 * @param {object} reqest 
 * @param {object} response 
 */

function homePage(req,res) { 
 path = 'underConstruction.html';
 //path = 'underConstruction.html';
 console.log("serving /" + path);
 res.sendFile(path, { root: 'public' }); 
}

/**{app.routes.homePageRoutes.tempHomePage
 * :[GET]} <br/><br/> *!TEMP FUNCTION!* Method to render the temp home page
 * @exports tempHomePage
 * @param {object} reqest 
 * @param {object} response 
 */

function tempHomePage(req,res) { 
 
 path = 'startPage.html';
 console.log("serving /" + path);
 res.sendFile(path, { root: 'public' }); 
}

exports.homePage = homePage;
exports.tempHomePage = tempHomePage;