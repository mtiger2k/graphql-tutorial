import React from 'react';
import {
  Link
} from 'react-router-dom'

import {
    gql,
    graphql,
} from 'react-apollo';

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

import AddChannel from './AddChannel';

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <PageWrapper>
      <PageHeader
        title="Channels List"
        description="Channels List with data"
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'Channels List' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <Box
          title="Channels List!"
          status="primary"
          expandable
          removable
        >
        <div className="channelsList">
          <AddChannel />
          { channels.map( ch =>
            (<div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
              <Link to={ch.id < 0 ? `/` : `channel/${ch.id}`}>
                {ch.name}
              </Link>
            </div>)
          )}
        </div>
        </Box>
      </PageContent>
    </PageWrapper>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export default graphql(channelsListQuery, {
  options: { pollInterval: 5000 },
})(ChannelsList);
