const express = require('express')
const router = express.Router()

// add a post
router.post('/posts', (req, res) => {
  res.send('This is add new post endpoint')
})

// get all posts
router.get('/posts', (req, res) => {
  res.send('This is get all posts endpoint')
})

// get my posts
router.get('/posts/me', (req, res) => {
  res.send('This is get my posts endpoint')
})

module.exports = router