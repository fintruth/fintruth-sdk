import React from 'react'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import { renderLoadingIf } from 'utilities/loading'
import Recover, { Data, Variables } from './recover' // eslint-disable-line @typescript-eslint/no-unused-vars
import { recoverMutation } from './graphql'

const RecoverContainer: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Mutation<Data, Variables>
      mutation={recoverMutation}
      onCompleted={({ payload }) => {
        if (payload.error) {
          setNotice(payload.error.message)
          setStatus('failure')
        } else {
          setNotice('A verification email has been sent')
          setStatus('success')
        }
      }}
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <Recover
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

export default RecoverContainer
