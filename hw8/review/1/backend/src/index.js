import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import ChatBox from './resolvers/Chatbox';
import Message from './resolvers/Message';
import Subscription from './resolvers/Subscription';

import mongo from './mongo';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    ChatBox,
    Message
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();

server.start({ port: process.env.PORT | 5001 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5001}!`);
});
