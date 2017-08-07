import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';
import NotFound from './components/NotFound';
import ChannelDetails from './components/ChannelDetails';
import Upload from './components/Upload';

// integrate with redux
import { AUTH_SIGNIN } from './actions';
import authReducer from './reducers/authReducer';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import createHistory from 'history/createBrowserHistory'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import { reducer as formReducer } from 'redux-form';

import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk'

import {
  ApolloClient,
  ApolloProvider,
  toIdValue,
} from 'react-apollo';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import { createNetworkInterface } from 'apollo-upload-client'

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

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const middlewares = process.env.NODE_ENV === 'development' ?
    [applyMiddleware(middleware, reduxThunk, createLogger())] :
    [applyMiddleware(middleware, reduxThunk)];

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer,
    auth: authReducer,
    router: routerReducer
  }),
  compose(
    applyMiddleware(client.middleware()), ...middlewares,
    // If you are using the devToolsExtension, you can add it here also
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
)

if (token) {
  // We need to update application state if the token exists
  store.dispatch({ type: AUTH_SIGNIN });
}

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

class App extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
            <Switch>
              <Route exact path="/" component={ChannelsListWithData}/>
              <Route path="/channel/:channelId" component={ChannelDetails}/>
              <Route path="/upload" component={Upload}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </ConnectedRouter>
      </ApolloProvider>
    );
  }
}

export default App;
