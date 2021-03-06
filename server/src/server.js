
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
import path from 'path'

mongoose.connect('mongodb://localhost/auth', {
  useMongoClient: true
})

const PORT = 4000;
const server = express();

console.log(process.env.NODE_ENV);
// Express only serves static assets in production

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

if (process.env.NODE_ENV === "production") {
  // move build to server folder
  server.use('/', express.static("build"));
  server.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


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
