const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {getOneRecipe, addRecipe, updateRecipe, LikeOrDislikeRecipe, deleteRecipe} = require('../service/recipeReq')
const {createComment, deleteComment} = require('../service/commentReq')

router.get('/:recipeId', auth, getOneRecipe)
router.post('/add', auth, addRecipe)
router.post('/edit/:recipeId', auth, updateRecipe)
router.post('/comment/add/:recipeId', auth, createComment)
router.post('/like/:recipeId', auth, LikeOrDislikeRecipe)
router.post('/delete/:recipeId', auth, deleteRecipe)
router.post('/comment/delete/:commentId', auth, deleteComment)

module.exports = router