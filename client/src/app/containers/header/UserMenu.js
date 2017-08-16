import React from 'react';

import UserMenu from '../../../lib/header/UserMenu';
import history from '../../../lib/history';
import { connect } from 'react-redux';

/*const user = {
  name: 'Alexander Pierce',
  title: 'Web Developer',
  joined: 'Nov. 2012',
  avatar: '/dist/img/user2-160x160.jpg',
  online: true,
};*/

function onLinkClick(link) {
  // eslint-disable-next-line no-alert
  // alert(`route to ${link.url}`);
  history.push(link.url);
}

function onButtonClick(button) {
  // eslint-disable-next-line no-alert
  // alert(`button ${button.text} clicked`);
  history.push(button.url);
}

export default connect((state) => {
  return {
    user: state.user.user
  }
})(function ({user}) {
  user.avatar = '/dist/img/user2-160x160.jpg';
  return (
    <UserMenu
      image={user.avatar}
      name={user.username}
      title={`${user.username} - ${user.dispName}`}
      description={`Member since ${user.joined}`}
      links={[
        { key: 1, text: 'Followers', url: '/followers' },
        { key: 2, text: 'Sales', url: '/sales' },
        { key: 3, text: 'Friends', url: '/friends' },
      ]}
      buttons={[
        { key: 1, text: 'Profile', align: 'left', url: '/profile' },
        { key: 2, text: 'Sign out', url: '/signout' },
      ]}
      onLinkClick={onLinkClick}
      onButtonClick={onButtonClick}
    />
  );
})
