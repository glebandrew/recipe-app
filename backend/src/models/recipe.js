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
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	comments: [],
	author: {
		name: {
			type: String
		},
		id: {
			type: mongoose.Schema.Types.ObjectId
		}
	},
	likes: {
		type: Number,
		default: 0
	},
	photos: [{
		photo: {
			type: Buffer,
		}
	}]
})

const Recipe = mongoose.model('recipes', recipeSchema)

module.exports = Recipe