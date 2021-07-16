const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findOne({_id: decodedToken._id, 'tokens.token': token })
		console.log('token:', token)
		console.log('decodedToken:' , decodedToken)

		if (!user) {
			throw new Error('This user does NOT exist in the system!')
		}

		req.user = user
		next()
	} catch(e) {
		res.status(401).send('Please Authenticate!')
	}
}

module.exports = auth