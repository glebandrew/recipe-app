const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {getAllRecipes, getOneRecipe, getFavRecipes, getUsersRecipes} = require('../service/recipeReq')
const {getProfile} = require('../service/userReq')

router.get('/', getAllRecipes)
router.get('/recipe/:recipeId', auth, getOneRecipe)
router.get('/user/profile', auth, getProfile)
router.get('/user/favorite/recipe', auth, getFavRecipes)
router.get('/user/recipes', auth, getUsersRecipes)

module.exports = router