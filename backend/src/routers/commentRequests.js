const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const { createComment, deleteComment, LikeOrDislikeComment } = require('../service/commentReq')

router.post('/add/:recipeId', auth, createComment)
router.post('/delete/:commentId', auth, deleteComment)
router.post('/like/:commentId', auth, LikeOrDislikeComment)

module.exports = router