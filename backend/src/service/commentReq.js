const { NFRError } = require('../consts/constErrors')
const Comment = require('../models/comment')
const Recipe = require('../models/recipe')

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
		await req.user.comments.push(comment)
		await req.user.save()
		const recipe = await Recipe.findById(req.params.recipeId)
		if(!recipe) throw new Error(NFRError)
		await recipe.comments.push(comment)
		await recipe.save()
		res.status(200).send({comment})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

module.exports = createComment