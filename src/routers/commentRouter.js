const express =require('express')
const router = express.Router()
const Comment = require('../models/comment')
const auth = require('../middleware/auth')

// add a comment
router.post('/comments/:postId/new', auth, async (req, res) => {
  const comment = new Comment({
    ...req.body,
    owner: req.user._id,
		parent_post: req.params.postId
  })

	try {
		await comment.save()
		res.status(201).send(comment)
	} catch(e) {

	}
})

// get my comments
router.get('/comments/me', auth, async (req, res) => {
	try {
		const comments = await Comment.find({owner: req.user._id})
		res.status(200).send(comments)
	} catch(e) {
		res.status(400).send(e)
	}
})

module.exports = router