import mongoose from 'mongoose'

const { Schema, model } = mongoose

const assignedReviewSchema = new Schema({
  reviewer: {
    type: String,
    required: true,
  },
  toBeReviewed: {
    type: String,
    required: true,
  },
})

const AssignedReview = model('AssignedReview', assignedReviewSchema)
export default AssignedReview
