const Message = {
  async sender(parent, args, { db, pubsub }, info){
  	const myuser = await db.UserModel.findById(parent.sender);
  	if(!myuser)
    	throw new Error
    return myuser.name;
  }
};

export { Message as default };