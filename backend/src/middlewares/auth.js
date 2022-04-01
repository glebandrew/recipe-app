const jwt = require('jsonwebtoken')
const { NFError } = require('../consts/constErrors')
const User = require('../models/user')

const auth = async (req, res, next) => {
	try {
		const token = req.header('authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
		if(!user) throw new Error(NFError)
		req.token = token
		req.user = user
		next()
	} catch(e) {
		res.status(500).send(e.message)
	}
}

module.exports = auth