import db from './db';  // see the README for how to manipulate this object

// TODO
import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
// import Subscription from './resolvers/Subscription';
import Person from './resolvers/Person';
import Location from './resolvers/Location';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    // Subscription,
    Person,
    Location,
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});

// Setup the GraphQL server