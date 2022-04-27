const { upload } = require('../middlewares/upload')
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {getOneRecipe, addRecipe, updateRecipe, LikeOrDislikeRecipe, deleteRecipe, addPhotoForRecipe} = require('../service/recipeReq')

router.get('/:recipeId', auth, getOneRecipe)
router.post('/add', auth, addRecipe)
router.post('/edit/:recipeId', auth, updateRecipe)
router.post('/like/:recipeId', auth, LikeOrDislikeRecipe)
router.post('/delete/:recipeId', auth, deleteRecipe)
router.post('/add/photo/:recipeId', auth, upload.array('files', 10), addPhotoForRecipe,
(error, req, res, next) => {
    res.status(400).send({error: error.message})
})

module.exports = router