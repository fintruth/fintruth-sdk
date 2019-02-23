import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { User } from '@fintruth-sdk/shared'
import { rem } from 'polished'

import BaseButton from 'components/button'
import DisableTwoFactorAuthAppDialog from './disable-two-factor-auth-app-dialog'
import EnableTwoFactorAuthAppDialog from './enable-two-factor-auth-app-dialog'
import {
  EnableTwoFactorAuthAppMutationData,
  enableTwoFactorAuthAppMutation,
} from './graphql'

interface Props {
  user: User
}

const Button = styled(BaseButton)`
  display: inline-flex;
  margin-left: ${rem(20)};
`

const AuthenticatorAppButton: React.FunctionComponent<Props> = ({
  user,
  ...rest
}: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <Mutation<EnableTwoFactorAuthAppMutationData>
      mutation={enableTwoFactorAuthAppMutation}
      onCompleted={({ response }) =>
        response.error ? undefined : setIsModalOpen(true)
      }
    >
      {(onClick, { data, loading }) => (
        <React.Fragment>
          <Button
            {...rest}
            isLoading={loading}
            isOutlined
            onClick={() =>
              user.isTwoFactorAuthEnabled ? setIsModalOpen(true) : onClick()
            }
            status={data && data.response.error ? 'danger' : 'default'}
          >
            EDIT
          </Button>
          {user.isTwoFactorAuthEnabled ? (
            <DisableTwoFactorAuthAppDialog
              isOpen={isModalOpen}
              onDismiss={() => setIsModalOpen(false)}
              user={user}
            />
          ) : (
            <EnableTwoFactorAuthAppDialog
              dataUrl={data && data.response.dataUrl}
              isOpen={isModalOpen}
              onDismiss={() => setIsModalOpen(false)}
              secret={data && data.response.secret}
            />
          )}
        </React.Fragment>
      )}
    </Mutation>
  )
}

export default AuthenticatorAppButton
