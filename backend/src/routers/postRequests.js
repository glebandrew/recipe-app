const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const { addRecipe, updateRecipe } = require('../service/recipeReq')
const {signInRequest, signOutRequest, signUpRequest} = require('../service/userReq')

router.post('/user/signin', signInRequest)
router.post('/user/signup', signUpRequest)
router.post('/user/signout', auth, signOutRequest)
router.post('/recipe/add', auth, addRecipe)
router.post('/recipe/edit/:id', auth, updateRecipe)

module.exports = router