const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const createComment = require('../service/commentReq')
const { addRecipe, updateRecipe, LikeOrDislikeRecipe } = require('../service/recipeReq')
const {signInRequest, signOutRequest, signUpRequest} = require('../service/userReq')

router.post('/user/signin', signInRequest)
router.post('/user/signup', signUpRequest)
router.post('/user/signout', auth, signOutRequest)
router.post('/recipe/add', auth, addRecipe)
router.post('/recipe/edit/:recipeId', auth, updateRecipe)
router.post('/recipe/comment/add/:recipeId', auth, createComment)
router.post('/recipe/like/:recipeId', auth, LikeOrDislikeRecipe)

module.exports = router