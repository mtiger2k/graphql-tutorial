import React, { Component } from 'react';

//import 'font-awesome/css/font-awesome.min.css';
//import "bootstrap/dist/css/bootstrap.min.css";

//import navigationModel from './navigation.json';
//import NavigationBar from './components/navigation/NavigationBar';
//import NavigationBar from './components/navbar';
//import './App.css';
import MainRoutes from './routes';

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
  /*state = {
    navModel : navigationModel
  };*/
  render() {
    //const { navModel } = this.state;
    return (
      <ApolloProvider store={store} client={client}>
        <ConnectedRouter history={history}>
          <div>
            <MainRoutes />
          </div>
        </ConnectedRouter>
      </ApolloProvider>
    );
  }

  handleLeftNavItemClick = (event, viewName) => {
    if (viewName === 'logout') {
    }
  }

  handleRightNavItemClick = (event, viewName) => {
    if (viewName === 'logout') {
    }
  }

}

export default App;
