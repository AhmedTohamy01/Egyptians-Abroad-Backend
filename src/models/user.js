const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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

// hash user's password before saving to database
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

// add custom function to valdiate user by credentials 
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('This user is NOT registered!')
	}

	const isPasswordMatch = bcrypt.compare(password, user.password)

	if (!isPasswordMatch) {
		throw new Error('The password is NOT correct!')
  }

	return user
}

const User = mongoose.model('User', userSchema)

module.exports = User