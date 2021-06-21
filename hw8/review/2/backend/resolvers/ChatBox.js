const ChatBox = {
  async messages(parent, args, { db, pubsub }, info)
  {
    const mychatbox = await db.ChatBoxModel.findOne({name:parent.name})
    if(!mychatbox)
    	throw new Error;
    return Promise.all(parent.messages.map((mId) => db.MessageModel.findById(mId)))
  },
};

export { ChatBox as default };
