import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 

    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    text: {
        type: String,
    },

    image: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);
export default Message;
