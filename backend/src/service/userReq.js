const User = require('../models/user')
const {NFError, SWW, PDMError, OPWError} = require('../consts/constErrors')
const bcrypt = require('bcrypt')
const Recipe = require('../models/recipe')
const Comment = require('../models/comment')

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
		const token = await user.generateAuthToken()
		res.cookie('auth_token', token)
		res.status(200).send({user, token})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const getProfile = async (req, res) => {
	try {
		const recipes = await Recipe.find({'author.id': req.user._id, 'author.name': req.user.name})
		res.status(200).send({user: req.user, recipes})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const editProfile = async (req, res) => {
	try {
		if(req.body.password) throw new Error('Error')
		const user = await User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true})
		if(!req.body.name) throw new Error('Error')
		await Recipe.updateMany({'author.id': req.user._id}, {$set: {'author.name': req.body.name}})
		await Comment.updateMany({'author.id': req.user._id}, {$set: {'author.name': req.body.name}})
		await user.save()
		res.status(200).send(user)
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const editPassword = async (req ,res) => {
	try {
		if(!req.body.password || !req.body.passwordAgain || !req.body.oldPassword) throw new Error('Error')
		const isMatch = await bcrypt.compare(req.body.oldPassword, req.user.password)
		if(!isMatch) throw new Error(OPWError)
		if(req.body.password !== req.body.passwordAgain) throw new Error(PDMError)
		const password = await bcrypt.hash(req.body.password, 8)
		const user = await User.findOneAndUpdate({_id: req.user._id}, {...req.body, password}, {new: true})
		await user.save()
		res.status(200).send(user)
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
		if(!user) throw new Error(NFError)
		await Recipe.deleteMany({'author.id': req.user._id})
		await Comment.deleteMany({'author.id': req.user._id})
		await user.remove()
		res.status(200).send('OK')
	} catch (e) {
		res.status(500).send(e.message)
	}
}

module.exports = {signUpRequest, signOutRequest, signInRequest, getProfile, editProfile, editPassword, deleteUser}