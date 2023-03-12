import { Router } from 'express'

import Employee from '../models/Employee.js'

const router = Router()

// default login page
router.get('/', (req, res) => {
  res.render('index')
})
router.get('/login', (req, res) => {
  res.render('index')
})

// validate login
router.post('/validate', async (req, res) => {
  if (req.session.logged) {
    // already logged
  } else {
    await Employee.findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          if (result.password === req.body.password) {
            console.log(result)
            req.session.logged = true
            req.session.isAdmin = result.admin
            req.session.email = result.email
            console.log(req.session.id)
            console.log(req.session)
            if (result.admin) res.redirect('/admin')
            else res.redirect('/employee')
          } else console.log('Incorrect Password')
        } else console.log('No such User exist') // handel
      })
      .catch((er) => console.log(er))
  }
})

// Lout out
router.get('/logout', (req, res) => {
  // console.log(req.sessionID)
  req.session.regenerate(() => {
    // console.log(req.sessionID)
    // console.log('session regenerated')
  })
  req.session.destroy(() => console.log('Session destroyed'))
  // req.session.logged=false
  // req.session.isAdmin=false
  res.redirect('/admin')
})

// router.get('/employee', async (req, res) => {
//   const emplist = await Employee.find({})

//   console.log(emplist)
//   res.render('admin')
// })

export default router
