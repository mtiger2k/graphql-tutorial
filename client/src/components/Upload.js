import React from 'react'
import { graphql, gql } from 'react-apollo'

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
    <input
      type="file"
      accept={'image/jpeg,image/png'}
      required
      onChange={handleChange}
    />
  )
})