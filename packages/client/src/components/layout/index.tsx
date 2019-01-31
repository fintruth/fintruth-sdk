import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { renderLoadingIf } from 'utilities/loading'
import Layout, { Data } from './layout' // eslint-disable-line @typescript-eslint/no-unused-vars
import { signOutMutation, signOutQuery } from './graphql'

const LayoutContainer: React.FunctionComponent = ({ ...rest }) => (
  <Query<Data> fetchPolicy="network-only" query={signOutQuery}>
    {({ client, data = {}, loading }) => (
      <Mutation
        mutation={signOutMutation}
        onCompleted={() => client.resetStore()}
      >
        {(onSignOut, result) =>
          renderLoadingIf(loading || result.loading, () => (
            <Layout {...rest} onSignOut={onSignOut} user={data.user} />
          ))
        }
      </Mutation>
    )}
  </Query>
)

export default LayoutContainer
