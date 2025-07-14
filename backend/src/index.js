import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './lib/mongodb.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

import { io, app, server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? true : 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
        }
    })
}

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).json({message});
})

server.listen(PORT, () => {
    console.log(`Server is running on the port http://localhost:${PORT}`);
    connectDB();
})