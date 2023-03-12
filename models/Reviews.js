import mongoose, { SchemaTypes } from 'mongoose'

const { Schema, model } = mongoose

const reviewsSchema = new Schema({
  reviewFor: {
    // type: SchemaTypes.ObjectId,
    // ref: 'Employee',
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  reviewFrom: {
    type: String,
    required: true,
  },
})

const Reviews = model('Reviews', reviewsSchema)
export default Reviews
