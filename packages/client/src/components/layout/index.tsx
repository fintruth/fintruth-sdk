import React from 'react'
import { Mutation, Query } from 'react-apollo'
import Layout, { Data } from './layout'
import { layoutQuery, signOutMutation } from './graphql'
import { renderLoadingIf } from 'utilities/loading'

const LayoutContainer: React.FunctionComponent = ({ ...rest }) => (
  <Query<Data> fetchPolicy="network-only" query={layoutQuery}>
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
