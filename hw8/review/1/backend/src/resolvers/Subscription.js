const Subscription = {
  message: {
    async subscribe(parent, { chatBoxName }, { db, pubsub }, info) {
      const chatBox = await db.ChatBoxModel.findOne({ name: chatBoxName });

      if (!chatBox) {
        throw new Error("ChatBox not found!")
      }

      return pubsub.asyncIterator(`message ${chatBoxName}`);
    },
  }
};

export { Subscription as default };
