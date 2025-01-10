const dotenv = require('dotenv')
dotenv.config()
const cors =require ('cors')
const express = require('express')
const userRoute = require('./routes/user.routes')
const captainRoute = require('./routes/captain.routes')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())

app.use(cors())

app.use(express.json())  
app.use(express.urlencoded({ extended: true }))  

app.use('/users',userRoute)
app.use('/captains',captainRoute)


module.exports = app