import { Router } from 'express'

import loggedAuth from '../middlewares/loggedinAuth.js'
import AssignedReview from '../models/AssignedReview.js'
import Employee from '../models/Employee.js'
import Reviews from '../models/Reviews.js'

const router = Router()

// Auth for logged in
router.use('/myReviews', loggedAuth)
router.use('/showMyReviews', loggedAuth)

// default login page
router.get('/', (req, res) => {
  if (req.session.logged) {
    if (req.session.isAdmin) {
      res.redirect('/admin')
    } else {
      res.redirect('/myReviews')
    }
  } else res.render('index', { flash: req.flash('msg') })
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
    res.redirect('/admin')
  })
  // req.session.destroy(() => console.log('Session destroyed'))
  // req.session.logged=false
  // req.session.isAdmin=false
})

// Redirector for my reviews
router.get('/myReviews', (req, res) => {
  res.redirect('showMyReviews')
})
// My reviews
router.get('/showMyReviews', async (req, res) => {
  console.log('Reached  my reviews')

  // let data
  // Reviews.find({ reviewFor: req.session.email }).then((result) => {
  //   data = result
  // })
  console.log('show My Reivew')
  // console.log(data)
  // AssignedReview.find({ reviewFrom: req.session.email }).then((work) => {
  //   res.render('myReviews', {
  //     work,
  //     records: data,
  //     isAdmin: req.session.isAdmin,
  //     title: 'My Reviews',
  //   })
  // })

  const [data, work] = [
    await Reviews.find({ reviewFor: req.session.email }).then((result) => result),
    await AssignedReview.find({ reviewFrom: req.session.email }).then((assigned) => assigned),
  ]

  res.render('myReviews', {
    work,
    records: data,
    isAdmin: req.session.isAdmin,
    title: 'My Reviews',
  })
  // res.render('myReviews', { email: req.session.email })
})
// Add Review
router.post('/addReview', async (req, res) => {
  await Reviews.create({
    reviewFor: req.body.reviewFor,
    review: req.body.review,
    reviewFrom: req.session.email,
  })
    .then(() => {
      console.log('Review added')
    })
    .catch((e) => {
      console.log(e)
    })
})
export default router
