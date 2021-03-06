const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {NFError} = require('../consts/constErrors')
const Schema = require('mongoose').Schema


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	login: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	googleId: {
		type: String,
	},
	avatar: {
		type: Schema.Types.Mixed
	},
	tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
	liked: []
})

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()
	delete userObject.password
	return userObject
}

userSchema.statics.findByCredentials = async (login, password) => {
	const user = await User.findOne({login})
	if(!user) {
		throw new Error(NFError)
	}
	const isMatch = await bcrypt.compare(password, user.password)
	if(!isMatch) throw new Error(NFError)
	return user
}

userSchema.methods.generateAuthToken = async function() {
	const user = this
	const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
	user.tokens = user.tokens.concat({token})
	await user.save()
	return token
}

const User = mongoose.model('users', userSchema)
module.exports = User