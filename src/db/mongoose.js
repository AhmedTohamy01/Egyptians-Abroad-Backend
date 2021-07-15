const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.once('open', () => console.log('Connected to database!'))
