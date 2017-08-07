import {
  ApolloClient,
  toIdValue,
} from 'react-apollo';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import { createNetworkInterface } from 'apollo-upload-client'

export default function createApolloClient() {
  const token = localStorage.getItem('token');
  const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
  networkInterface.use([{
    applyMiddleware(req, next) {
      setTimeout(next, 500);
    },
  }]);

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }

      // Get the authentication token from local storage if it exists
      req.options.headers.token = token ? token : null;
      next();
    }
  }]);

  const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
    reconnect: true
  });

  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
  );

  function dataIdFromObject (result) {
    if (result.__typename) {
      if (result.id !== undefined) {
        return `${result.__typename}:${result.id}`;
      }
    }
    return null;
  }

  const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    customResolvers: {
      Query: {
        channel: (_, args) => {
          return toIdValue(dataIdFromObject({ __typename: 'Channel', id: args['id'] }))
        },
      },
    },
    dataIdFromObject,
  });

  return client;
}