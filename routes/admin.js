import { Router } from 'express'

import AssignedReview from '../models/AssignedReview.js'
import Employee from '../models/Employee.js'
import Reviews from '../models/Reviews.js'

const router = Router()

// Defalut redirecters
router.get(['', '/'], (req, res) => {
  res.redirect('admin/showEmployee')
})

// Show employee list
router.get('/showEmployee', async (req, res) => {
  console.log('Reached Show Employee')
  const emplist = await Employee.find({})
  // console.log(emplist)
  res.render('admin', { title: 'Employee Records', records: emplist })
})

// Add new employee
router.post('/add', async (req, res) => {
  // console.log('Reached Add')
  console.log(req.body)
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
  // console.log('Loading Add Employee Page')
  res.render('addEmployee', { status: 'good', msg: '' })
})

// Remove employee
router.post('/remEmployee', async (req, res) => {
  // console.log('Reached delete Employee')
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

// Assign Review Task Form
router.post('/assign', async (req, res) => {
  const emplist = await Employee.find({})
  return res.render(
    'assignReview.ejs',
    {
      title: 'Assign Review Task Form',
      records: emplist,
      name: req.body.name,
      email: req.body.email,
    },
    (er, html) => {
      if (er) {
        console.log(er)
      } else {
        res.send(html)
      }
    }
  )
})

// Assign Review Task
router.post('/assignReviewTask', async (req, res) => {
  // console.log(req.query.id)
  // console.log(req.body.reviewFor)
  await AssignedReview.create({
    reviewFrom: req.query.id,
    reviewFor: req.body.reviewFor,
  })
    .then(() => {
      // console.log('Assigned new Task')
    })
    .catch((e) => {
      console.log(e)
    })
  res.redirect(req.baseUrl)
})
export default router
