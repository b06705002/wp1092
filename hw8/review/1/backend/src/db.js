import mongoose from "mongoose";
const { Schema } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
});

const messageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});

const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

const db = {
  UserModel,
  ChatBoxModel,
  MessageModel
}

export { db as default };