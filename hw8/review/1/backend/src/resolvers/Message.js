const Message = {
    sender(parent, args, { db }, info) {
        return db.UserModel.findOne(parent.sender._id)
            .populate('sender')
            .exec();
    }
}

export default Message;