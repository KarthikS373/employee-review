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

router.get('/employee', async (req, res) => {
  const emplist = await Employee.find({ email: 'asdfasdf' })

  console.log(emplist)
  res.render('admin')
})

export default router
