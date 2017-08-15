import React, { Component } from 'react';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';

import {
    gql,
    graphql,
} from 'react-apollo';

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

const NotFound = () => {
  return (
    <div className="NotFound">Channel Not Found</div>
  );
};

const messagesSubscription = gql`
  subscription messageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
    }
  }
`

class ChannelDetails extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: messagesSubscription,
      variables: {
        channelId: this.props.match.params.channelId,
      },
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newMessage = subscriptionData.data.messageAdded;

        // don't double add the message
        if (!prev.channel.messages.find((msg) => msg.id === newMessage.id)) {
          return Object.assign({}, prev, {
            channel: Object.assign({}, prev.channel, {
              messages: [...prev.channel.messages, newMessage]
            })
          });
        } else {
          return prev;
        }
      }
    })
  }

  render() {
    const { data: {loading, error, channel }, match } = this.props;

    return (
    <PageWrapper>
      <PageHeader
        title="Channel Detail"
        description="Channel Detail"
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'Channels List', url: '/channelList'},
            { key: 3, title: 'Channel Detail' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <Box
          title="Channel Detail"
          status="primary"
          expandable
          removable
        >
        {loading && <ChannelPreview channelId={match.params.channelId}/>}
        {error && <p>{error.message}</p>}
        {!loading && channel && <div>
          <div className="channelName">
            {channel.name}
          </div>
          <MessageList messages={channel.messages}/>
        </div>}
        {!loading && channel == null && <NotFound />}
        </Box>
      </PageContent>
    </PageWrapper>
    );
  }
}

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId : ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export default (graphql(channelDetailsQuery, {
  options: (props) => ({
    variables: { channelId: props.match.params.channelId },
  }),
})(ChannelDetails));
