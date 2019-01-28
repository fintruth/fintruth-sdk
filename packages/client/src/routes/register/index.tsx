import React from 'react'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import { renderLoadingIf } from 'utilities/loading'
import Register, { Data, Variables } from './register' // eslint-disable-line typescript/no-unused-vars
import { registerMutation } from './graphql'

const RegisterContainer: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState<string>('success')

  return (
    <Mutation<Data, Variables>
      mutation={registerMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setStatus('failure')
        } else {
          setNotice('A verification email has been sent')
          setStatus('success')
        }
      }}
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <Register
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

export default RegisterContainer
