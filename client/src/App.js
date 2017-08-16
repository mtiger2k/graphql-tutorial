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
import { me } from './actions/user';

import client from './lib/createApolloClient';
import store from './lib/configureStore';
import history from './lib/history';

import {
  ApolloProvider
} from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux'

const token = localStorage.getItem('token');
if (token) {
  // We need to update application state if the token exists
  store.dispatch({ type: AUTH_USER });
  store.dispatch(me());
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
