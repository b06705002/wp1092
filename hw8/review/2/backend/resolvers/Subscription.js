const Subscription = {
  messages: {
    subscribe(parent, { chatboxName }, { db, pubsub }, info) {
      const room = db.ChatBoxModel.findById(chatboxName);

      if (!room) {
        throw new Error('Room not found');
      }

      return pubsub.asyncIterator(`message ${chatboxName}`);
    },
  },
};

export { Subscription as default };
