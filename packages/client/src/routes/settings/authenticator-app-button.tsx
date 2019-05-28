import { useMutation } from '@apollo/react-hooks'
import { User } from '@fintruth-sdk/shared'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseButton from 'components/button'
import DisableTwoFactorAuthDialog from './disable-two-factor-auth-dialog'
import EnableTwoFactorAuthDialog from './enable-two-factor-auth-dialog'
import {
  EnableTwoFactorAuthMutationData,
  enableTwoFactorAuthMutation,
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
  ...props
}: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const [onClick, { data, loading }] = useMutation<
    EnableTwoFactorAuthMutationData
  >(enableTwoFactorAuthMutation, {
    onCompleted: ({ response }) =>
      response.error ? undefined : setIsModalOpen(true),
  })

  return (
    <React.Fragment>
      <Button
        {...props}
        isLoading={loading}
        isOutlined
        onClick={() =>
          user.isTwoFactorAuthEnabled ? setIsModalOpen(true) : onClick()
        }
        variant={data && data.response.error && 'danger'}
      >
        EDIT
      </Button>
      {user.isTwoFactorAuthEnabled ? (
        <DisableTwoFactorAuthDialog
          isOpen={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          user={user}
        />
      ) : (
        <EnableTwoFactorAuthDialog
          dataUrl={data && data.response.dataUrl}
          isOpen={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          secret={data && data.response.secret}
        />
      )}
    </React.Fragment>
  )
}

export default AuthenticatorAppButton
