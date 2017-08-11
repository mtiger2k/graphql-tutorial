// @flow weak

import React, {
  PureComponent
}                     from 'react';

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

class About extends PureComponent {
  render() {
    return(
    <PageWrapper>
      <PageHeader
        title="Home page"
        description="Welcome to the first page"
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'Page' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <Box
          title="Hello, World!"
          status="primary"
          expandable
          removable
        >
        <h1>
        About
      	</h1>
        </Box>
      </PageContent>
    </PageWrapper>

    );
  }
}

export default About;
