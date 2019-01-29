import React from 'react'
import { Mutation } from 'react-apollo'
import { RouteComponentProps, navigate } from '@reach/router'
import { renderLoadingIf } from 'utilities/loading'
import SignIn, { Data, Variables } from './sign-in' // eslint-disable-line @typescript-eslint/no-unused-vars
import { signInMutation, signInQuery } from './graphql'

const SignInContainer: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Mutation<Data, Variables>
      mutation={signInMutation}
      onCompleted={({ payload }) => {
        if (payload.error) {
          setNotice(payload.error.message)
          setStatus('failure')
        } else {
          navigate('/')
        }
      }}
      update={(cache, { data = { payload: { user: null } } }) =>
        cache.writeQuery({ data: data.payload, query: signInQuery })
      }
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <SignIn
            {...rest}
            notice={notice}
            onSubmit={onSubmit}
            status={status}
          />
        ))
      }
    </Mutation>
  )
}

export default SignInContainer
