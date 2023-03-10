import { Router } from 'express'

import AssignedReview from '../models/AssignedReview.js'
import Employee from '../models/Employee.js'
import Reviews from '../models/Reviews.js'

const router = Router()

// Show employee list
router.get('/showEmployee', async (req, res) => {
  console.log('Reached Show Employee')
  const emplist = await Employee.find({})
  // console.log(emplist)
  res.render('admin', { title: 'Employee Records', records: emplist })
})

// Add new employee
router.post('/add', async (req, res) => {
  console.log('Reached Add')
  console.log(req.body)
  // if (Employee.exists({ email: req.body.email })) {
  //   console.log('Email id already exits')
  //   // res.send(' <p class="alert alert-danger">Email ID is already in use</p>')
  //   // res.redirect('addEmployee')
  //   req.flash('error', 'Same Email Id already in use')
  //   res.redirect('/addEmployee')
  //   return
  // }
  const emp = await Employee.create({
    email: req.body.email,
    name: req.body.name,
    admin: req.body.admin === 'on',
    password: req.body.password,
  })
    .then(() => {
      console.log('New emplyee added')
    })
    .catch((e) => {
      console.log(e)
    })

  console.log(emp)
  res.redirect('showEmployee')
})

// Add employee get call
router.get('/addEmployee', (req, res) => {
  console.log('Loading Add Employee Page')
  res.render('addEmployee', { status: 'good', msg: '' })
})

// Remove employee
router.post('/remEmployee', async (req, res) => {
  console.log('Reached delete Employee')
  console.log(req.body.id)
  console.log(
    await Employee.deleteOne({ _id: req.body.id })
      .then(() => {
        console.log('Deleted')
        res.json({ successful: true })
      })
      .catch((e) => {
        console.log(e)
        res.json({ successful: false })
      })
  )
})

// Reviews List
router.get('/reviews', async (req, res) => {
  const reviewList = await Reviews.find({})
  res.render('admin', { title: 'Reviews Records', records: reviewList })
})

// Asign a Review Task
router.post('/assign', async (req, res) => {
  const task = await AssignedReview.create({
    reviewer: req.body.reviewer,
    toBeReviewed: req.body.review,
    gotReviewed: req.body.gotReviewed,
  })
    .then(() => {
      console.log('New emplyee added')
    })
    .catch((e) => {
      console.log(e)
    })
})

export default router
