import React from 'react';
import { connect } from 'react-redux';
import UserPanel from '../../../lib/sidebar/UserPanel';

/*const user = {
  name: 'Alexander Pierce',
  title: 'Web Developer',
  joined: 'Nov. 2012',
  avatar: '/dist/img/user2-160x160.jpg',
  isOnline: true,
};*/

export default connect((state) => {
  return {
    user: state.user.user
  }
})(function ({user}) {
  if (!user) {
    user = {};
    user.dispName = 'loading';
    user.isOnline = false;
  } else {
    user.isOnline = true;
    user.avatar = '/dist/img/user2-160x160.jpg';
  }

  const onlineIcon = 'fa fa-circle text-success';
  const offlineIcon = 'fa fa-circle text-danger';
  const statusIcon = user.isOnline ? onlineIcon : offlineIcon;
  const statusText = user.isOnline ? 'Online' : 'Offline';
  return (
    <UserPanel
      image={user.avatar}
      name={user.dispName}
      statusIcon={statusIcon}
      statusText={statusText}
    />
  );
})
