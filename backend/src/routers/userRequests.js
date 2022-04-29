const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth = require('../middlewares/auth')
const {upload} = require('../middlewares/upload')
const {getFavRecipes, getUsersRecipes} = require('../service/recipeReq')
const {signInRequest, signOutRequest, signUpRequest, editProfile, editPassword, getProfile, deleteUser, uploadAvatar} = require('../service/userReq')

router.post('/signin', signInRequest)
router.post('/signup', signUpRequest)
router.post('/signout', auth, signOutRequest)
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/user/signup'}),
	function (req, res) {
		res.cookie('auth_token', req.user.tokens[req.user.tokens.length - 1].token)
		res.cookie('name', req.user.name)
		res.send()
	})
router.get('/profile', auth, getProfile)
router.get('/favorite/recipe', auth, getFavRecipes)
router.get('/recipes', auth, getUsersRecipes)

//Если хочешь поменять просто тело,то достаточно передать только имя и логин новые,или просто имя
//Если хочешь поменять пароль,то должны быть поля :"OldPassword", "password" , "passwordAgain"
//Где "OldPassword" это старый пароль, "password"- новый пароль, "passwordAgain" - повторенный новый пароль

router.post('/profile/edit', auth, editProfile)
router.post('/profile/edit/password', auth, editPassword)
router.post('/profile/delete', auth, deleteUser)
router.post('/avatar', auth, upload.single('avatar'), uploadAvatar,
(error, req, res, next) => {
    res.status(400).send({error: error.message})
})

module.exports = router