const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const auth = require('../middleware/auth')

// add new post
router.post('/posts/new', auth, async (req, res) => {
  const post = new Post({
		...req.body,
		owner: req.user._id
	})
	try {
		await post.save()
		res.status(201).send(post)
	} catch(e) {
		res.status(400).send(e)
	}
})

// get all posts
router.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find({})
		res.status(200).send(posts)
	} catch (e) {
		res.status(400).send(e)
	}
})

// get my posts
router.get('/posts/me', (req, res) => {
  res.send('This is get my posts endpoint')
})

module.exports = router