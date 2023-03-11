import mongoose from 'mongoose'

const { Schema, model } = mongoose

const assignedReviewSchema = new Schema({
  reviewFrom: {
    type: String,
    required: true,
  },
  reviewFor: {
    type: String,
    required: true,
  },
})

const AssignedReview = model('AssignedReview', assignedReviewSchema)
export default AssignedReview
