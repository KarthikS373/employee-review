import { Router } from 'express'

import Employee from '../models/Employee.js'

const router = Router()

// default login page
router.get('/', (req, res) => {
  res.render('index', { flash: req.flash('msg') })
})
router.get('/login', (req, res) => {
  res.render('index', { flash: req.flash('msg') })
})

// validate login
router.post('/validate', async (req, res) => {
  if (req.session.logged) {
    // already logged
    console.log('allready logged in')
    if (req.session.isAdmin) {
      res.redirect('/admin')
    } else {
      res.redirect('/employee')
    }
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
          } else {
            req.flash('msg', 'Incorrect Password')
            res.redirect('/')
            console.log('Incorrect Password')
          }
        } else {
          req.flash('msg', 'No such User exist')
          res.redirect('/')
          console.log('No such User exist')
        } // handel
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
    res.redirect('/admin')
  })
  // req.session.destroy(() => console.log('Session destroyed'))
  // req.session.logged=false
  // req.session.isAdmin=false
})

// router.get('/employee', async (req, res) => {
//   const emplist = await Employee.find({})

//   console.log(emplist)
//   res.render('admin')
// })

export default router
