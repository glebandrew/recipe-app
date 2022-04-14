const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {getOneRecipe, addRecipe, updateRecipe, LikeOrDislikeRecipe, deleteRecipe} = require('../service/recipeReq')

router.get('/:recipeId', auth, getOneRecipe)
router.post('/add', auth, addRecipe)
router.post('/edit/:recipeId', auth, updateRecipe)
router.post('/like/:recipeId', auth, LikeOrDislikeRecipe)
router.post('/delete/:recipeId', auth, deleteRecipe)

module.exports = router