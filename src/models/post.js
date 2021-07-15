const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
})


// add virtual comments field 
userSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent_post',
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post