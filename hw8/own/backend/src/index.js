import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import ChatBox from './resolvers/ChatBox';
import Message from './resolvers/Message';
import User from './resolvers/User'

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    // Subscription,
    ChatBox,
    Message,
    User,
  },
  context: {
    db,
    pubsub,
  },
});

const mongoose = require('mongoose');

require('dotenv-defaults').config();

function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mongodb = mongoose.connection;

  mongodb.on('error', console.error.bind(console, 'connection error:'));
  mongodb.once('open', function () {
    console.log('Mongo database connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
