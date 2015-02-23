function logout(req , res) {
  req.logout();
  res.redirect('/');
}
exports.logout = logout;