
const io = require('socket.io')(4001, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection", (socket) => {

    socket.on('new-user-add', (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("Connected Users", activeUsers)
        io.emit('get-users', activeUsers)
    })

    socket.on("send-message", (data) => {
        const { receiverId } = data
        const user = activeUsers.filter((user) => user.userId === receiverId)
        if (user) {
            user.map((u) => {
                console.log(u.socketId);
                // io.to(u.socketId).emit("recieveMessage", data)
                io.emit("recieveMessage", data)
            })
        }
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("User Disconnected")
        io.emit('get-users', activeUsers)
    })
})