const adminAuth = (req, res, next) => {
  console.log('Auth')
  //   console.log(req.session.id)
  //   console.log(req.session)
  if (req.session.logged) {
    if (req.session.isAdmin) {
      next()
    } else {
      console.log('You are not admin')
      res.redirect('/employee')
    }
  } else {
    console.log('Login first')
    res.redirect('/')
  }
}
export default adminAuth
