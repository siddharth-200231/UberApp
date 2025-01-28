const http = require('http')
const app = require("./index")
const server = http.createServer(app)
const port = process.env.PORT || 3000
const dbConnect = require("./db/db.js")
dbConnect()
 
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

io.on("connection", (socket) => {
   socket.on('ride-request', (data) => {
       console.log(data)
       io.emit('ride-request', data)
   })
});


server.listen(port, () => {
    console.log(` 🌐 Server has started on port ${port} `)
})