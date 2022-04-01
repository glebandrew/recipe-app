const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	photo: {
		type: String
	},
	description: {
		type: String,
		reqired: true,
	}
})

const Recipe = mongoose.model('recipes', recipeSchema)

module.exports = Recipe