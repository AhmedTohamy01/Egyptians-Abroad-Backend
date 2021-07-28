const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const auth = require('../middleware/auth')

// add new comment
router.post('/comments/:postId/new', auth, async (req, res) => {
  const comment = new Comment({
    ...req.body,
    owner: req.user._id,
    parent_post: req.params.postId,
  })

  try {
    await comment.save()
    res.status(201).send(comment)
  } catch (e) {
		res.status(400).send(e)
	}
})

// get my comments
router.get('/comments/me', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ owner: req.user._id })
    res.status(200).send(comments)
  } catch (e) {
    res.status(400).send(e)
  }
})

// get all comments for specific post WITH match, sort or pagination options.
//
// GET /comments?completed=true
// GET /comments?limit=10&skip=20
// GET /comments?sortBy=createdAt:desc
// GET /comments?postId=60f9e010c6cd832a84e9a4cf
router.get('/comments', auth, async (req, res) => {
  const sort = {}

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    const comments = await Comment.find(
      { parent_post: req.query.postId },
      null,
      {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      }
    )
    res.status(200).send(comments)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
