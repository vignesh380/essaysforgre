function homePage(req,res) { 
 
 path = 'underConstruction.html';
 //path = 'underConstruction.html';
 console.log("serving /" + path);
 res.sendFile(path, { root: 'public' }); 
}

function tempHomePage(req,res) { 
 
 path = 'startPage.html';
 console.log("serving /" + path);
 res.sendFile(path, { root: 'public' }); 
}

exports.homePage = homePage;
exports.tempHomePage = tempHomePage;