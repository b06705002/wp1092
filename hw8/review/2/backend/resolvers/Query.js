const Query = {
  async chatboxs(parent, {name}, { db, pubsub }, info) {
    //console.log(args)
    if (!name) {
      return null
    }

    return await db.ChatBoxModel.findOne({name});;
  },
};

export { Query as default };
