import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        credentials: true,
    }
})

const userSockets = {};

export const receiverSocketId = (userId) => {
    return userSockets[userId];
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        userSockets[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSockets));

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete userSockets[userId];
        io.emit('getOnlineUsers', Object.keys(userSockets));
    })
});

export { io , app, server };