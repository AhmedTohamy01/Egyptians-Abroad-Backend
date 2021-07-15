const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowerCase: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid!')
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
})


// add virtual posts field 
userSchema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: 'owner'
})

// add virtual comments field 
userSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'owner'
})

const User = mongoose.model('User', userSchema)

module.exports = User