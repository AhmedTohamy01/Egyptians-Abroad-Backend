const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const auth = require('../middleware/auth')

// add new post
router.post('/posts/new', auth, async (req, res) => {
  const post = new Post({
    ...req.body,
    owner: req.user._id,
  })
  try {
    await post.save()
    res.status(201).send(post)
  } catch (e) {
    res.status(400).send(e)
  }
})

// get one post
router.get('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(201).send(post)
  } catch (e) {
    res.status(400).send(e)
  }
})

// get all posts without match, sort or pagination options.
// router.get('/posts', auth, async (req, res) => {
//   try {
//     const posts = await Post.find({})
//     res.status(200).send(posts)
//   } catch (e) {
//     res.status(400).send(e)
//   }
// })

// get all posts WITH match, sort or pagination options.
//
// GET /posts?completed=true
// GET /posts?limit=10&skip=20
// GET /posts?sortBy=createdAt:desc
router.get('/posts', auth, async (req, res) => {
  const sort = {}

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    const posts = await Post.find(null, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort,
    })
    res.status(200).send(posts)
  } catch (e) {
    res.status(400).send(e)
  }
})

// get my posts without match, sort or pagination options.
//
// router.get('/posts/me', auth, async (req, res) => {
//   try {
// 		const posts = await Post.find({ owner: req.user._id })
// 		res.status(200).send(posts)
// 	} catch(e) {
// 		res.status(400).send(e)
// 	}
// })

// get my posts WITH match, sort or pagination options.
//
// GET /posts/me?completed=true
// GET /posts/me?limit=10&skip=20
// GET /posts/me?sortBy=createdAt:desc
router.get('/posts/me', auth, async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user
      .populate({
        path: 'posts',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate()
    res.send(req.user.posts)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
