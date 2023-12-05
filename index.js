// Importing required modules
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

// Creating an instance of the Express application
const app = express();

// Creating an HTTP server using the Express app
const server = http.createServer(app);

// Configuring CORS options
const corsOptions = {
    origin: "*",  // Allow requests from any origin (replace with specific origin in production).
    methods: ["GET", "POST"]
};

// Initializing Socket.IO with the server and CORS options
const io = socketIO(server, { cors: corsOptions });

// Handling Socket.IO connections
io.on("connection", (socket) => {

    // Emitting the user's ID to the connected socket
    socket.emit("myId", socket.id);

    // Handling socket disconnect event
    socket.on("disconnect", () => {
        // Broadcasting a "callEnded" event to all connected sockets
        socket.broadcast.emit("callEnded");
    });

    // Handling "callUser" event
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        // Emitting a "callUser" event to the specified user with relevant data
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    // Handling "answerCall" event
    socket.on("answerCall", (data) => {
        // Emitting a "callAccepted" event to the specified user with signal data
        io.to(data.to).emit("callAccepted", data.signal);
    });
});


// Using CORS middleware for the Express app
app.use(cors());

// Defining the port for the server
const PORT = process.env.PORT || 5000;

// Making the route to the  server
app.get("/", (req, res) => {
    return res.send(`Server is running`)
})

// Starting the server and logging the port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
