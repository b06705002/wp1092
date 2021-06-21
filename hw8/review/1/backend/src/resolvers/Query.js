const Query = {
  async chatBoxes(parent, args, { db }, info) {
    if (!args.name) {
      return await db.ChatBoxModel.find({});
    }
    const chatBox = await db.ChatBoxModel.findOne({ name: args.name });
    return chatBox;
  },

  async messages(parent, args, { db }, info) {
    if (!args.name) {
      return await db.MessageModel.find();
    }
    const sender = await db.UserModel.findOne({ name: args.name });
    return await db.MessageModel.find({ sender });
  }
};

export { Query as default };
