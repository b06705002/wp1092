async function checkUser(db,name,mode){
  const exist = await db.UserModel.findOne({name:name});
  if(!exist)
    return false;
  else
    return exist;
};

async function newUser (db,name){
  const newUser = new db.UserModel({name:name});
  await newUser.save();
  return;
};

async function checkChatBox (db, name, mode){
  const exist = await db.ChatBoxModel.findOne({name:name});
  if(!exist)
    return false;
  else
    return exist;
};

async function newChatBox (db,name){
  const newChatBox = new db.ChatBoxModel({name:name,messages:[]});
  await newChatBox.save();
  return newChatBox;
};

function makeChatBoxName (name1,name2){
  const arr = [name1,name2].sort()
  return arr.join('_');
}

const Mutation = {
  async createChatBox(parent, { name1, name2 },
                              { db, pubsub }, info)
  {
    if (!name1 || !name2)
      throw new Error
      ("Missing chatBox name for CreateChatBox");
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }
    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + name2);
      await newUser(db, name2);
    }
    const chatboxname = makeChatBoxName(name1,name2);
    const mybox = await checkChatBox(db, chatboxname, "createChatBox");
    if(!mybox){
      console.log("ChatBox does not exist for CreateChatBox: " + chatboxname);
      return (await newChatBox(db, chatboxname));
    }
    else
      return mybox;
    //return {name:name1+"_"+name2,messages:[{sender:'AI',body:'world'}]};
  },
  async createMessage(parent, {send, to, content}, { db, pubsub }, info){
    //find sender id
    const myname = await checkUser(db, send, "createMessage");
    if(!myname) throw new Error;
    //newMessage
    //save
    const newMessage = new db.MessageModel({sender:myname.id,body:content});
    await newMessage.save();
    //updateChatbox
    //const chatboxname = makeChatBoxName(send,to);
    const mybox = await checkChatBox(db, to, "createMessage");
    if(!mybox) throw new Error("Cannot find chat box in creatMessage");
    mybox.messages.push(newMessage.id);
    await mybox.save();
    //deal with subscription
    pubsub.publish(`message ${mybox.name}`,{messages:newMessage})
    //return message
    return newMessage;    
  },
  
};

export { Mutation as default };
