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
import Signin from './components/auth/signin'
import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import { PrivateRoute } from './components/auth/require_auth'
import Feature from './components/feature'

// integrate with redux
import { AUTH_USER } from './actions/types'
import configureStore from './lib/configureStore';
import createApolloClient from './lib/createApolloClient';

import {
  ApolloProvider
} from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

const client = createApolloClient();

const initialState = {};

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

const store = configureStore(initialState, client, history);

const token = localStorage.getItem('token');
if (token) {
  // We need to update application state if the token exists
  store.dispatch({ type: AUTH_USER });
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
              <Route path="/signin" component={Signin}/>
              <Route path="/signout" component={Signout}/>
              <Route path="/signup" component={Signup}/>
              <PrivateRoute path="/feature" component={Feature}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </ConnectedRouter>
      </ApolloProvider>
    );
  }
}

export default App;
