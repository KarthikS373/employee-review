const adminAuth = (req, res, next) => {
  console.log('Logged in Auth')
  //   console.log(req.session.id)
  //   console.log(req.session)
  if (req.session.logged) {
    next()
  } else {
    console.log('Login first')
    req.flash('msg', 'Login First')
    res.redirect('/')
  }
}
export default adminAuth
