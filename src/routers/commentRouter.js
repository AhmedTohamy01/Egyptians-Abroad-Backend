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
router.get('/comments/me', (req, res) => {
  res.send('This is get my comments endpoint')
})

module.exports = router