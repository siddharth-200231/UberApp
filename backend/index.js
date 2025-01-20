const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const userRoute = require('./routes/user.routes')
const captainRoute = require('./routes/captain.routes')
const cookieParser = require('cookie-parser')
const app = express()

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // React app's URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoute)
app.use('/captains', captainRoute)

module.exports = app