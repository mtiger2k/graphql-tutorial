import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import ChannelsListWithData from './components/ChannelsListWithData';
import NotFound from './components/NotFound';
import Home from './components/home';
import About from './components/about';
import ChannelDetails from './components/ChannelDetails';
import Upload from './components/Upload';
import Signin from './components/auth/signin'
import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import { PrivateRoute } from './components/auth/require_auth'
import Feature from './components/feature'


export const routes = () => {
  return (
    <Switch>
      {/* non protected views */}
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <PrivateRoute path="/channelList" component={ChannelsListWithData}/>
      <PrivateRoute path="/channel/:channelId" component={ChannelDetails}/>
      <Route path="/upload" component={Upload}/>
      <Route path="/signout" component={Signout}/>
      <Route path="/signin" component={Signin}/>
      <Route path="/signup" component={Signup}/>
      {/* protected views */}
      <PrivateRoute path="/feature" component={Feature}/>
      {/* page not found */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default routes;