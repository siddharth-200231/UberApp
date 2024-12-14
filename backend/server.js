const http = require('http')
const app= require("./index")
const server=http.createServer(app)
const port = process.env.PORT || 3000
const dbConnect = require ("./db/db.js")
dbConnect()
server.listen(port,()=>{
    console.log( ` Server has started on port ${port} ` )
})