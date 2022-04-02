const Recipe = require('../models/recipe')
const {NFRError, PermissionDeniedError} = require('../consts/constErrors')
const User = require('../models/user')
const Comment = require('../models/comment')

const getAllRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find({})
		res.status(200).send({recipes})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const addRecipe = async (req, res) => {
	try {
		const recipe = await new Recipe({
			...req.body, 
			author: {
				name: req.user.name,
				id: req.user._id
			}
		})
		await req.user.recipes.push(recipe)
		await req.user.save()
		await recipe.save()
		res.status(200).send({recipe})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const getOneRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.recipeId)
		if(!recipe) throw new Error(NFRError)
		res.status(200).send({recipe})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const updateRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.recipeId)
		if(!recipe) throw new Error(NFRError)
		const newRecipe = await Recipe.findOneAndUpdate(req.params.recipeId, req.body, {new: true})
		res.status(200).send({newRecipe})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const LikeOrDislikeRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.recipeId)
		if(!recipe) throw new Error(NFRError)
		if(req.user.liked.includes(req.params.recipeId)) {
			recipe.likes--
			req.user.liked = await req.user.liked.filter((recipeId) => recipeId !== req.params.recipeId) 
		} else {
			recipe.likes++
			await req.user.liked.push(req.params.recipeId)
		}
		await req.user.save()
		await recipe.save()
		res.status(200).send({recipe})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const getFavRecipes = async (req, res) => {
	try {
		const recipes = await Promise.all(req.user.liked.map(async function (recipeId) {
			const recipe = await Recipe.findById(recipeId)
			return recipe
		}))
		return res.status(200).send({recipes})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const getUsersRecipes = async (req, res) => {
	try {
		res.status(200).send({recipes: req.user.recipes})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const deleteRecipe = async (req, res) => {
	try {
		console.log(req.params.recipeId)
		const recipe = await Recipe.findById(req.params.recipeId)
		if(!recipe) throw new Error(NFRError)
		if(!req.user._id.equals(recipe.author.id)) throw new Error(PermissionDeniedError)
		req.user.recipes = await req.user.recipes.filter((recipe) => !recipe._id.equals(req.params.recipeId))
		await req.user.save()
		const users = await User.find({})
		await Promise.all(users.map( async (user) => {
			user.liked = await user.liked.filter((recipeId) => recipeId !== req.params.recipeId)
			await user.save()
		}))
		await Comment.deleteMany({recipe: req.params.recipeId})
		await Recipe.deleteOne({_id: req.params.recipeId})
		res.status(200).send('deleted')
	} catch (e) {
		res.status(500).send(e.message)
	}
}

module.exports = {
	getAllRecipes,
	addRecipe,
	getOneRecipe,
	updateRecipe, 
	LikeOrDislikeRecipe,
	getFavRecipes,
	getUsersRecipes,
	deleteRecipe
}