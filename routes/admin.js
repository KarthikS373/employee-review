import { Router } from 'express'

import adminAuth from '../middlewares/adminAuth.js'
import AssignedReview from '../models/AssignedReview.js'
import Employee from '../models/Employee.js'
import Reviews from '../models/Reviews.js'

const router = Router()

// Route Protection
router.use('', adminAuth)

// Defalut redirecters
router.get(['', '/'], (req, res) => {
  res.redirect('/admin/show-employee')
})

// Show employee list
router.get('/show-employee', async (req, res) => {
  console.log('Reached Show Employee')
  const emplist = await Employee.find({})
  // console.log(emplist)
  res.render('admin', { title: 'Employee Records', records: emplist, isAdmin: req.session.isAdmin })
})

// Update Employee
router.post('/update-employee', async (req, res) => {
  // console.log('Reached Add')
  console.log(req.body)
  await Employee.findOne({ email: req.body.email })
    .then((doc) => {
      /* eslint-disable no-param-reassign */
      doc.name = req.body.name
      doc.admin = req.body.admin === 'on'
      doc.password = req.body.password
      /* eslint-enable no-param-reassign */
      doc
        .save()
        .then((r) => {
          console.log('Update Successful')
        })
        .catch((er) => console.log(er))

      res.redirect('show-employee')
      // console.log(doc)
    })
    .catch((err) => console.log(err))
})

router.get('/update-employee', async (req, res) => {
  await Employee.findOne({ email: req.query.email })
    .then((result) => {
      res.render('changeEmployee', {
        title: 'Update Employee form',
        emp: result,
        isAdmin: req.session.isAdmin,
      })
    })
    .catch((err) => console.log(err))
})

// Add new employee
router.post('/add', async (req, res) => {
  // console.log('Reached Add')
  // console.log(req.body)
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
  res.redirect('show-employee')
})

// Add employee get call
router.get('/add-employee', (req, res) => {
  // console.log('Loading Add Employee Page')
  res.render('addEmployee', { title: 'Add Employee', isAdmin: req.session.isAdmin })
})

// Remove employee
router.post('/rem-employee', async (req, res) => {
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
  res.render('admin', {
    title: 'Reviews Records',
    isAdmin: req.session.isAdmin,
    records: reviewList,
  })
})

// Assign Review Task Form
router.post('/assign', async (req, res) => {
  const emplist = await Employee.find({})
  return res.render(
    'assignReview.ejs',
    {
      title: 'Assign Review Task Form',
      records: emplist,
      isAdmin: req.session.isAdmin,
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
router.post('/assign-review-task', async (req, res) => {
  // console.log(req.query.id)
  // console.log(req.body.reviewFor)
  await AssignedReview.create({
    reviewFrom: req.query.id,
    reviewFor: req.body.reviewFor,
  })

  res.redirect(req.baseUrl)
})

// Edit Reiview
// Show Review list
router.get('/show-review', async (req, res) => {
  console.log('Reached Show Review')
  const revlist = await Reviews.find({ reviewFor: req.query.id })
  // console.log(emplist)
  res.render('showReview', {
    title: 'Review Records',
    records: revlist,
    isAdmin: req.session.isAdmin,
  })
})

// Update Employee
router.post('/update-review', async (req, res) => {
  console.log('update review')
  console.log(req.body)
  await Reviews.findById(req.body.id)
    .then((doc) => {
      console.log(doc)
      /* eslint-disable no-param-reassign */
      doc.review = req.body.review
      /* eslint-enable no-param-reassign */
      doc
        .save()
        .then((r) => {
          console.log('Update Successful')
        })
        .catch((er) => console.log(er))

      res.redirect('show-employee')
      // console.log(doc)
    })
    .catch((err) => console.log(err))
})

router.post('/rem-review', async (req, res) => {
  await Reviews.deleteOne({
    _id: req.body.id,
  })
    .then(() => {
      console.log('Deleted Review')
    })
    .catch((e) => {
      console.log(e)
    })
})

export default router
