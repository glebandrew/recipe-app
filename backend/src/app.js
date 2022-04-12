const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('./db/mongoose')
const userRequests= require('./routers/userRequests')
const recipeRequests = require('./routers/recipeRequests')
const commentRequests = require('./routers/commentRequests')
const { getAllRecipes } = require('./service/recipeReq')
const app = express()
const port = process.env.PORT || 1000

//MAIN APP
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use('/user', userRequests)
app.use('/recipe', recipeRequests)
app.use('/comment', commentRequests)
app.get('/', getAllRecipes)
app.listen(port, () => {
	console.log(`server is up on port ${port}`)
})