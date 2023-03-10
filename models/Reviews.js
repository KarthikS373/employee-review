import mongoose, { SchemaTypes } from 'mongoose'

const { Schema, model } = mongoose

const reviewsSchema = new Schema({
  reviewer: {
    type: SchemaTypes.ObjectId,
    ref: 'Employee',
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  gotReviewed: {
    type: SchemaTypes.ObjectId,
    ref: 'Employee',
    required: true,
  },
})

const Reviews = model('Reviews', reviewsSchema)
export default Reviews
