const Recipe = require('../models/recipe')
const {NFRError, PermissionDeniedError, PhotoIsMissing} = require('../consts/constErrors')
const sharp = require('sharp')
const User = require('../models/user')
const Comment = require('../models/comment')

const getAllRecipes = async (req, res) => {
	try {
		const findRecipes = async function (searchParam = {}) {
			const recipes = await Recipe.find(searchParam)
				.sort({likes: -1})
				.limit(limit)
				.skip((page - 1) * limit)
			return recipes
		}
		const recipeCounter = async function (searchParam = {}) {
			const recipes = await Recipe.find(searchParam)
			const count = Math.ceil(recipes.length / limit)
			return count
		}
		const {page = 1, limit = 6} = req.query
		if(!req.query.select) {
			const recipes = await findRecipes()
			const count = recipeCounter()
			res.status(200).send({recipes, count})
		} else {
			const recipes = await findRecipes({title: {$regex: new RegExp('^' + req.query.select, 'i')}})
			const count = recipeCounter({title: {$regex: new RegExp('^' + req.query.select, 'i')}})
			res.status(200).send({recipes, count})
		}
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
		if(!req.user._id.equals(recipe.author.id)) throw new Error(PermissionDeniedError)
		if(!recipe) throw new Error(NFRError)
		const newRecipe = await Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true})
		await newRecipe.save()
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
		const recipes = await Recipe.find({'author.id': req.user._id})
		res.send({recipes})
	} catch (e) {
		res.status(500).send(e.message)
	}
}

const deleteRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.recipeId)
		if(!recipe) throw new Error(NFRError)
		if(!req.user._id.equals(recipe.author.id)) throw new Error(PermissionDeniedError)
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

const addPhotoForRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.recipeId)
		if(!recipe) throw new Error(NFRError)
		if(!req.files) throw new Error(PhotoIsMissing)
		await Promise.all(req.files.map(async (photo) => {
			const buffer = await sharp((photo).buffer).resize({width: 250, height: 250}).png().toBuffer()
			recipe.photos = await recipe.photos.concat({photo: buffer})
		}))
		await recipe.save()
		res.status(201).send()
	} catch (e) {
		res.status(400).send(e.message)
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
	deleteRecipe,
	addPhotoForRecipe
}