import mongoose from 'mongoose'

const { Schema, model } = mongoose

const employeeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  admin: Boolean,
  password: {
    type: String,
    required: true,
  },
})

const Employee = model('Employee', employeeSchema)
export default Employee
