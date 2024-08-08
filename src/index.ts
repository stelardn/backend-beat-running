import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import express from 'express';
import http from 'http'

const pubsub = new PubSub();

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ 
  schema,
  context: () => ({ pubsub })
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({app})

  const httpServer = http.createServer(app)

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: () => ({ pubsub })
    },
    {
      server: httpServer,
      path: apolloServer.graphqlPath
    }
  )

  httpServer.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000/${apolloServer.graphqlPath}`);
  });
})



