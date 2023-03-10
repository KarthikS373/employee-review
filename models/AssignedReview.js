import mongoose from 'mongoose'

const { Schema, model } = mongoose

const assignedReviewSchema = new Schema({
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
    pass: String,
    required: true,
  },
})

const AssignedReview = model('Employee', assignedReviewSchema)
export default AssignedReview
