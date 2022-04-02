const Recipe = require('../models/recipe')
const {NFRError} = require('../consts/constErrors')

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

module.exports = {getAllRecipes, addRecipe, getOneRecipe, updateRecipe, LikeOrDislikeRecipe, getFavRecipes}