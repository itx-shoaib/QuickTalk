// add express
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const io = require("socket.io")(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
})

app.use(cors());

server.listen(PORT, console.log(`Server is running on port ${PORT}`))