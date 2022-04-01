const User = require('../models/user')
const {NFError, SWW, PDMError} = require('../consts/constErrors')
const bcrypt = require('bcrypt')

const signInRequest = async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.login, req.body.password)
		if(!user) return res.status(404).send(NFError)
		const token = await user.generateAuthToken()
		res.cookie('auth_token', token)
		res.status(200).send({user, token})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const signOutRequest = async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.status(200).send()
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const signUpRequest = async (req, res) => {
	try {
		const userExists = await User.findOne({login: req.body.login})
		if(userExists) {
			throw new Error(SWW)
		}
		if(req.body.password !== req.body.passwordAgain) throw new Error(PDMError)
		const password = await bcrypt.hash(req.body.password, 8)
		const user = await new User({
			...req.body,
			password
		})
		const token = user.generateAuthToken()
		res.cookie('auth_token', token)
		res.status(200).send({user, token})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

module.exports = {signUpRequest, signOutRequest, signInRequest}