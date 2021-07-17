const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const sharp = require('sharp')

// get all users (temp for testing)
router.get('/users', async (req, res) => {
  const users = await User.find({})
  res.send(users)
})

// signup a user account
router.post('/users/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    const token = await user.generateAuthToken()
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// login with a user account
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// get my user
router.get('/users/me', auth, (req, res) => {
  res.status(200).send(req.user)
})

// update my user
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdates) {
    throw new Error('Invalid Updates!')
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]))
    await req.user.save()
    res.status(200).send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// delete my user
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.status(200).send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// logout a user from one device
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((item) => item.token !== req.token)
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// logout a user from all devices
router.post('/users/logout/all', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// upload user avatar
router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .png()
        .resize({ width: 250, height: 250 })
        .toBuffer()
      req.user.avatar = buffer
      await req.user.save()
      res.send('Avatar uploaded sucessfully!')
    } catch (e) {
      res.status(400).send(e)
    }
  }
)

// delete user avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send('Avatar deleted sucessfully!')
  } catch (e) {
    res.status(400).send(e)
  }
})

// get a link for user avatar
router.delete('/users/:id/avatar', (req, res) => {
  res.send('This is get user avatar link endpoint')
})

module.exports = router
