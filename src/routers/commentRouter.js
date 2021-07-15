const express =require('express')
const router = express.Router()

// add a comment
router.post('/comments', (req, res) => {
  res.send('This is add new comment endpoint')
})

// add my comments
router.get('/comments/me', (req, res) => {
  res.send('This is get my comments endpoint')
})

module.exports = router