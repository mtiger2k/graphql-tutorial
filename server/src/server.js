
import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import router from './router'
import { schema } from './schema';
import mongoose from 'mongoose';

import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { apolloUploadExpress } from 'apollo-upload-server'

mongoose.connect('mongodb://localhost/auth', {
  useMongoClient: true
})

const PORT = 4000;
const server = express();

server.use(morgan('combined'));
//server.use('*', cors({ origin: 'http://localhost:3000' }));
server.use(cors());
server.use(bodyParser.json())

router(server);

server.use('/graphql', 
  apolloUploadExpress({
    // Optional, defaults to OS temp directory
    uploadDir: '/Users/tiansha/react/graphql-tutorial/uploads'
  }),
  graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
}));

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
