import { Router } from 'express'

import Employee from '../models/Employee.js'

const router = Router()

// router.get('/showEmployee', async (req, res) => {
//   console.log('Reached Show Employee')
//   await Employee.find({}).exec((err, data) => {
//     if (err) throw err
//     else {
//       console.log(data)
//       res.render('showEmployee', { title: 'Employee Records', record: data })
//     }
//   })
// })

router.get('/showEmployee', async (req, res) => {
  console.log('Reached Show Employee')
  const emplist = await Employee.find({})
  console.log(emplist)
  res.render('showEmployee', { title: 'Employee Records', record: emplist })
})

router.post('/add', async (req, res) => {
  console.log('Reached Add')
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

router.get('/addEmployee', (req, res) => {
  console.log('Loading Add Employee Page')
  res.render('addEmployee')
})

export default router
