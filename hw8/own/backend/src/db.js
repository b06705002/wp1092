// const users = [
//   {
//     id: '1',
//     name: 'Andrew',
//     email: 'andrew@example.com',
//     age: 27,
//   },
//   {
//     id: '2',
//     name: 'Sarah',
//     email: 'sarah@example.com',
//   },
//   {
//     id: '3',
//     name: 'Mike',
//     email: 'mike@example.com',
//   },
// ];

// const posts = [
//   {
//     id: '10',
//     title: 'GraphQL 101',
//     body: 'This is how to use GraphQL...',
//     published: true,
//     author: '1',
//   },
//   {
//     id: '11',
//     title: 'GraphQL 201',
//     body: 'This is an advanced GraphQL post...',
//     published: false,
//     author: '1',
//   },
//   {
//     id: '12',
//     title: 'Programming Music',
//     body: '',
//     published: true,
//     author: '2',
//   },
// ];

// const comments = [
//   {
//     id: '102',
//     text: 'This worked well for me. Thanks!',
//     author: '3',
//     post: '10',
//   },
//   {
//     id: '103',
//     text: 'Glad you enjoyed it.',
//     author: '1',
//     post: '10',
//   },
//   {
//     id: '104',
//     text: 'This did no work.',
//     author: '2',
//     post: '11',
//   },
//   {
//     id: '105',
//     text: 'Nevermind. I got it to work.',
//     author: '1',
//     post: '12',
//   },
// ];

// const db = {
//   users,
//   posts,
//   comments,
// };
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const messageSchema = new Schema({
  chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});

const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

const db = {
  UserModel,
  ChatBoxModel,
  MessageModel,
};

// const db = {
//   userSchema,
//   chatBoxSchema,
//   messageSchema,
// };

export { db as default };
