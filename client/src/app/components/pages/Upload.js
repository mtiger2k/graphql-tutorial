import React from 'react'
import { graphql, gql } from 'react-apollo'

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';

export default graphql(gql`
  mutation updateUserAvatar($userId: String!, $avatar: Upload!) {
    updateUserAvatar(userId: $userId, avatar: $avatar) {
      id
      name
    }
  }
`)(({ match, mutate }) => {
  const handleChange = ({ target }) => {
    if (target.validity.valid) {
      mutate({
        variables: {
          userId: '1111',
          avatar: target.files[0]
        }
      }).then(({ data }) => console.log('Mutation response:', data))
    }
  }

  return (
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
        <input
          type="file"
          accept={'image/jpeg,image/png'}
          required
          onChange={handleChange}
        />
      </PageContent>
    </PageWrapper>
  )
})