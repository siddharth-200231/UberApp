const dotenv = require('dotenv')
dotenv.config()
const cors =require ('cors')
const express = require('express')
const userRoute = require('./routes/user.routes')
const app = express()

app.use(cors())

app.use(express.json())  // This handles JSON payloads, similar to `body-parser`
app.use(express.urlencoded({ extended: true }))  
app.use('/users',userRoute)


module.exports = app