const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {createComment, deleteComment} = require('../service/commentReq')

router.post('/add/:recipeId', auth, createComment)
router.post('/delete/:commentId', auth, deleteComment)

module.exports = router