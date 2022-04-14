const Comment = require('../models/comment')
const Recipe = require('../models/recipe')
const {CNFError, NFRError, PermissionDeniedError} = require('../consts/constErrors')

const createComment = async (req, res) => {
	try {
		const comment = await new Comment({
			...req.body,
			author: {
				name: req.user.name,
				id: req.user._id
			},
			recipe: req.params.recipeId
		})
		const recipe = await Recipe.findById(req.params.recipeId)
		if(!recipe) throw new Error(NFRError)
		await recipe.comments.push(comment)
		await recipe.save()
		await comment.save()
		res.status(200).send({comment})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId)
		if(!comment) throw new Error(CNFError)
		if(!req.user._id.equals(comment.author.id)) throw new Error(PermissionDeniedError)
		const recipe = await Recipe.findById(comment.recipe)
		if(!recipe) throw new Error(NFRError)
		recipe.comments = await recipe.comments.filter((comment) => !comment._id.equals(req.params.commentId))
		await recipe.save()
		await comment.remove()
		res.status(200).send('deleted')
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const LikeOrDislikeComment = async(req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId)
		if(!comment) throw new Error(CNFError)
		if(comment.likedBy.includes(req.user._id)) {
			comment.likes -= 1
			comment.likedBy = await comment.likedBy.filter((userId) => !req.user._id.equals(userId))
		} else {
			comment.likes += 1
			await comment.likedBy.push(req.user._id)
		}
		await comment.save()
		res.status(200).send(comment)
	} catch (e) {
		res.status(500).send(e.message)
	}
}

module.exports = { createComment, deleteComment, LikeOrDislikeComment }