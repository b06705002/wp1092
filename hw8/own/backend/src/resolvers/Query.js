const Query = {
  findChatBox(parent, args, { db }, info) {
    if (!args.query) {
      return db.ChatBoxModel.find().then(chatBoxes => {
        return chatBoxes.map(chatBox => {
          return { ...chatBox._doc };
        });
      }).catch(error => {
        throw error
      })
    }
    return db.ChatBoxModel.find().then(chatBoxes => {
      return chatBoxes.map(chatBox => {
        return { ...chatBox._doc };
      }).filter((chatBox) => {
          return chatBox.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }).catch(error => {
      throw error
    })
  },
  async findUser(parent, args, { db }, info) {
    return await db.UserModel.findOne({name: args.query}).then(
      console.log("Find user: " + args.query)
    ).catch(error => {
      throw error
    })
  },
};

export { Query as default };