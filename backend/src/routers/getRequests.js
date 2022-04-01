const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {getAllRecipes, getOneRecipe} = require('../service/recipeReq')

router.get('/', getAllRecipes)
router.get('/recipe/:id', auth, getOneRecipe)

module.exports = router