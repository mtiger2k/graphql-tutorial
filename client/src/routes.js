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

import ChannelsListWithData from './app/components/pages/ChannelsListWithData';
import About from './app/components/pages/About';
import ChannelDetails from './app/components/pages/ChannelDetails';
import Upload from './app/components/pages/Upload';
import Feature from './app/components/pages/Feature'

export const routes = () => {

  /*const RouteWithLayout = ({ component, ...rest }) => {
    return (
      <Layout>
        <Route {...rest} render={ () => React.createElement(component) } />
      </Layout>
    );
  };*/

  const PrivateRouteWithLayout = ({ ...rest }) => {
    return (
      <Layout>
        <PrivateRoute {...rest} />
      </Layout>
    );
  };

  return (
    <div>
      <Switch>
        <Route exact path="/signout" component={Signout}/>
        <Route exact path="/signin" component={LoginPage}/>
        <Route exact path="/signup" component={RegisterPage}/>
        {/* non protected views */}
        <PrivateRouteWithLayout exact path="/" component={HomePage} />
        <PrivateRouteWithLayout path="/about" component={About}/>
        <PrivateRouteWithLayout path="/upload" component={Upload}/>
        {/* protected views */}
        <PrivateRouteWithLayout path="/channelList" component={ChannelsListWithData}/>
        <PrivateRouteWithLayout path="/channel/:channelId" component={ChannelDetails}/>
        <PrivateRouteWithLayout path="/feature" component={Feature}/>
        {/* page not found */}
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default routes;