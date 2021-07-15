const express = require('express')
require('../src/db/mongoose')
const userRouter = require('../src/routers/userRouter')
const postRouter = require('../src/routers/postRouter')
const commentRouter = require('../src/routers/commentRouter')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)
app.listen(port, () => {
  console.log(`Server connected on port ${port}!`)
})

// root query
app.get('/', (req, res) => {
  res.send('Welcome to Express!')
})
