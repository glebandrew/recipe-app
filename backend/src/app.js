const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('./db/mongoose')
const userRequests= require('./routers/userRequests')
const recipeRequests = require('./routers/recipeRequests')
const commentRequests = require('./routers/commentRequests')
const { getAllRecipes } = require('./service/recipeReq')
const passport = require('passport')
const app = express()
const port = process.env.PORT || 1000
const cookieSession = require('cookie-session')
require('./passport-setup/passport')

//MAIN APP
app.use(cookieSession({
	name: 'google-session',
	keys: ['key1', 'key2']
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:3001", credentials: true }))
app.use('/user', userRequests)
app.use('/recipe', recipeRequests)
app.use('/comment', commentRequests)
app.get('/', getAllRecipes)
app.listen(port, () => {
	console.log(`server is up on port ${port}`)
})