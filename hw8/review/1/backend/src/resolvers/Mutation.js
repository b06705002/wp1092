import uuidv4 from 'uuid/v4';
import { makeName } from '../utilities';

const checkUser = async(db, name) => {
  let user = await db.UserModel.findOne({ name });
  if (!user) {
    console.log("Creating user ", name);
    user = await new db.UserModel({ name }).save();
  }
  return user;
}

const checkChatBox = async(db, name) => {
  let box = await db.ChatBoxModel.findOne({ name });
  if (!box) {
    console.log("Initiating chatbox " + name);
    box = await new db.ChatBoxModel({ name }).save();
  }
  return box
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
}

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db }, info) {
    console.log("Creating chatbox for ", name1, name2);
    if (!name1 || !name2) {
      throw new Error("Missing chatBox name for CreateChatBox");
    }
    await checkUser(db, name1);
    await checkUser(db, name2);
    
    const chatBoxName = makeName(name1, name2);
    const chatBox = await checkChatBox(db, chatBoxName);
    return chatBox;
  },

  async createMessage(parent, { data }, { db, pubsub }, info) {
    if (!data.chatBoxName || !data.from || !data.body) {
      throw new Error("Missing to, from or body for CreateMessage");
    }
    const chatBox = await checkChatBox(db, data.chatBoxName);
    const sender = await checkUser(db, data.from);
    const newMessage = await new db.MessageModel({ sender, body: data.body}).save();
    chatBox.messages.push(newMessage);
    await chatBox.save();

    pubsub.publish(`message ${data.chatBoxName}`, {
      message: {
        mutation: 'CREATED',
        data: newMessage
      },
    });
    return newMessage;
  }
};

export { Mutation as default };
