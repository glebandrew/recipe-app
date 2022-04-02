const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
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
	}
})

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment