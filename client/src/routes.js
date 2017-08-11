import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Layout from './app/components/layout/Layout';

import { PrivateRoute } from './app/components/auth/require_auth'
import HomePage from './app/components/pages/HomePage'
import LoginPage from './app/components/pages/LoginPage'
import RegisterPage from './app/components/pages/RegisterPage'
import Signout from './app/components/pages/Signout'
import NotFound from './app/components/pages/NotFound';

import ChannelsListWithData from './components/ChannelsListWithData';
import About from './components/about';
import ChannelDetails from './components/ChannelDetails';
import Upload from './components/Upload';
import Feature from './components/feature'

export const routes = () => {

  const RouteWithLayout = ({ component, ...rest }) => {
    return (
      <Layout>
        <Route {...rest} render={ () => React.createElement(component) } />
      </Layout>
    );
  };

  const PrivateRouteWithLayout = ({ component, ...rest }) => {
    return (
      <Layout>
        <PrivateRoute {...rest} render={ () => React.createElement(component) } />
      </Layout>
    );
  };

  return (
    <Switch>
      <Route exact path="/signout" component={Signout}/>
      <Route exact path="/signin" component={LoginPage}/>
      <Route exact path="/signup" component={RegisterPage}/>
      {/* non protected views */}
      <RouteWithLayout exact path="/" component={HomePage} />
      <RouteWithLayout path="/about" component={About}/>
      <RouteWithLayout path="/upload" component={Upload}/>
      {/* protected views */}
      <PrivateRouteWithLayout path="/channelList" component={ChannelsListWithData}/>
      <PrivateRouteWithLayout path="/channel/:channelId" component={ChannelDetails}/>
      <PrivateRouteWithLayout path="/feature" component={Feature}/>
      {/* page not found */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default routes;