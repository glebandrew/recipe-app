const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {getFavRecipes, getUsersRecipes} = require('../service/recipeReq')
const {getProfile} = require('../service/userReq')
const {signInRequest, signOutRequest, signUpRequest, editProfile} = require('../service/userReq')

router.post('/signin', signInRequest)
router.post('/signup', signUpRequest)
router.post('/signout', auth, signOutRequest)
router.get('/profile', auth, getProfile)
router.get('/favorite/recipe', auth, getFavRecipes)
router.get('/recipes', auth, getUsersRecipes)
router.post('/profile/edit', auth, editProfile)

module.exports = router