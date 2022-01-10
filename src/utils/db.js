import mongoose from 'mongoose'

// Connect to DB
export const connect = (url = 'mongodb://127.0.0.1:27017/foodApp', opts = {}) => {
  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true }
  )
}
