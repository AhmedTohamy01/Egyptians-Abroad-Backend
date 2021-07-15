const express = require('express')
const router = express.Router()
const User = require('../models/user')

// signup a user account
router.post('/users/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send({user})
  } catch (e) {
    res.status(400).send(e)
  }
})

// login with a user account
router.post('/users/login', async (req, res) => {

  try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		res.status(200).send({user})
	} catch(e) {
		res.status(400).send(e)
	}
})

// get my user
router.patch('/users/me', (req, res) => {
  res.send('This is update my user endpoint')
})

// update my user
router.patch('/users/me', (req, res) => {
  res.send('This is update my user endpoint')
})

// delete my user
router.delete('/users/me', (req, res) => {
  res.send('This is delete my user endpoint')
})

// logout a user
router.post('/users/logout', (req, res) => {
  res.send('This is logout endpoint')
})

// logout a user from all devices
router.post('/users/logout/all', (req, res) => {
  res.send('This is logout from all devices endpoint')
})

// upload user avatar
router.post('/users/me/avatar', (req, res) => {
  res.send('This is upload my avatar endpoint')
})

// detele user avatar
router.delete('/users/me/avatar', (req, res) => {
  res.send('This is delete my avatar endpoint')
})

// get a link for user avatar
router.delete('/users/:id/avatar', (req, res) => {
  res.send('This is get user avatar link endpoint')
})

module.exports = router
