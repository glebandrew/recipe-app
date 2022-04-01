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
		const recipe = await new Recipe({...req.body})
		await recipe.save()
		res.status(200).send({recipe})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const getOneRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id)
		if(!recipe) throw new Error(NFRError)
		res.status(200).send({recipe})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const updateRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id)
		if(!recipe) throw new Error(NFRError)
		const newRecipe = await Recipe.findOneAndUpdate(req.params.id, req.body, {new: true})
		res.status(200).send({newRecipe})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

module.exports = {getAllRecipes, addRecipe, getOneRecipe, updateRecipe}