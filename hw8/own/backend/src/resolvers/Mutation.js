const Mutation = {

  async createChatBox(parent, args, { db, pubsub }, info) {
    const name1 = args.chatBoxInput.name1;
    const name2 = args.chatBoxInput.name2;
    if (!name1 || !name2) {
      throw new Error("Missing chatbox name for createChatBox");
    }
    let user1 = await db.UserModel.findOne({ name: name1 })
    let user2 = await db.UserModel.findOne({ name: name2 })
    if (!(user1)) {
      console.log("User doesn't exist for createChatBox: " + name1);
      user1 = await new db.UserModel({ name: name1 }).save();
    }
    if (!(user2)) {
      console.log("User doesn't exist for createChatBox: " + name2);
      user2 = await new db.UserModel({ name: name2 }).save();
    }
    const name = [name1, name2].sort().join('_');
    let box = await db.ChatBoxModel.findOne({ name });
    if (!box) box = await new db.ChatBoxModel({ name, users: [user1, user2] }).save();
    return box
      .populate('users')
      .populate({ path: 'messages', populate: 'sender' })
      .execPopulate();
  },
  // createPost(parent, args, { db, pubsub }, info) {
  //   const userExists = db.users.some((user) => user.id === args.data.author);

  //   if (!userExists) {
  //     throw new Error('User not found');
  //   }

  //   const post = {
  //     id: uuidv4(),
  //     ...args.data,
  //   };

  //   db.posts.unshift(post);

  //   if (args.data.published) {
  //     pubsub.publish('post', {
  //       post: {
  //         mutation: 'CREATED',
  //         data: post,
  //       },
  //     });
  //   }

  //   return post;
  // },
  // deletePost(parent, args, { db, pubsub }, info) {
  //   const postIndex = db.posts.findIndex((post) => post.id === args.id);

  //   if (postIndex === -1) {
  //     throw new Error('Post not found');
  //   }

  //   const [post] = db.posts.splice(postIndex, 1);

  //   db.comments = db.comments.filter((comment) => comment.post !== args.id);

  //   if (post.published) {
  //     pubsub.publish('post', {
  //       post: {
  //         mutation: 'DELETED',
  //         data: post,
  //       },
  //     });
  //   }

  //   return post;
  // },
  // updatePost(parent, args, { db, pubsub }, info) {
  //   const { id, data } = args;
  //   const post = db.posts.find((post) => post.id === id);
  //   const originalPost = { ...post };

  //   if (!post) {
  //     throw new Error('Post not found');
  //   }

  //   if (typeof data.title === 'string') {
  //     post.title = data.title;
  //   }

  //   if (typeof data.body === 'string') {
  //     post.body = data.body;
  //   }

  //   if (typeof data.published === 'boolean') {
  //     post.published = data.published;

  //     if (originalPost.published && !post.published) {
  //       pubsub.publish('post', {
  //         post: {
  //           mutation: 'DELETED',
  //           data: originalPost,
  //         },
  //       });
  //     } else if (!originalPost.published && post.published) {
  //       pubsub.publish('post', {
  //         post: {
  //           mutation: 'CREATED',
  //           data: post,
  //         },
  //       });
  //     }
  //   } else if (post.published) {
  //     pubsub.publish('post', {
  //       post: {
  //         mutation: 'UPDATED',
  //         data: post,
  //       },
  //     });
  //   }

  //   return post;
  // },
  // createComment(parent, args, { db, pubsub }, info) {
  //   const userExists = db.users.some((user) => user.id === args.data.author);
  //   const postExists = db.posts.some(
  //     (post) => post.id === args.data.post && post.published,
  //   );

  //   if (!userExists || !postExists) {
  //     throw new Error('Unable to find user and post');
  //   }

  //   const comment = {
  //     id: uuidv4(),
  //     ...args.data,
  //   };

  //   db.comments.push(comment);
  //   pubsub.publish(`comment ${args.data.post}`, {
  //     comment: {
  //       mutation: 'CREATED',
  //       data: comment,
  //     },
  //   });

  //   return comment;
  // },
  // deleteComment(parent, args, { db, pubsub }, info) {
  //   const commentIndex = db.comments.findIndex(
  //     (comment) => comment.id === args.id,
  //   );

  //   if (commentIndex === -1) {
  //     throw new Error('Comment not found');
  //   }

  //   const [deletedComment] = db.comments.splice(commentIndex, 1);
  //   pubsub.publish(`comment ${deletedComment.post}`, {
  //     comment: {
  //       mutation: 'DELETED',
  //       data: deletedComment,
  //     },
  //   });

  //   return deletedComment;
  // },
  // updateComment(parent, args, { db, pubsub }, info) {
  //   const { id, data } = args;
  //   const comment = db.comments.find((comment) => comment.id === id);

  //   if (!comment) {
  //     throw new Error('Comment not found');
  //   }

  //   if (typeof data.text === 'string') {
  //     comment.text = data.text;
  //   }

  //   pubsub.publish(`comment ${comment.post}`, {
  //     comment: {
  //       mutation: 'UPDATED',
  //       data: comment,
  //     },
  //   });

  //   return comment;
  // },
};

export { Mutation as default };
