const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    parent_post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
)

const Comment = new mongoose.model('Comment', commentSchema)

module.exports = Comment
