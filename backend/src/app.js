const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('./db/mongoose')
const postRequests= require('./routers/postRequests')
const getRequests = require('./routers/getRequests')
const app = express()
const port = process.env.PORT || 1000

//MAIN APP
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(postRequests)
app.use(getRequests)
app.listen(port, () => {
	console.log(`server is up on port ${port}`)
})