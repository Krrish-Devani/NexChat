import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import { wrapAsync } from '../lib/wrapAsync.js';
import ExpressError from '../lib/ExpressError.js';
import cloudinary from '../lib/cloudinary.js';
import { receiverSocketId, io } from '../lib/socket.js';

export const getUsers = wrapAsync(async (req, res) => {
    const userId = req.user._id;

    const filterUsers = await User.find({ _id: { $ne: userId }});

    res.status(200).json(filterUsers);
});

export const getMessages = wrapAsync(async (req, res) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId }
        ]
    });

    res.status(200).json(messages);
});

export const sendMessages = wrapAsync(async (req, res) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const { text, image } = req.body;

    if (!text && !image) {
        throw new ExpressError(400, 'Message text or image is required');
    }

    let imageUrl = null;

    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId: myId,
        receiverId: userToChatId,
        text,
        image: imageUrl
    });

    await newMessage.save();

    // Emit the new message to the receiver's socket
    const getReceiverSocketId = receiverSocketId(userToChatId);
    if (getReceiverSocketId) {
        io.to(getReceiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
});