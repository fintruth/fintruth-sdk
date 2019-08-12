import { Dialog, DialogProps } from '@reach/dialog'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import DisableTwoFactorAuthForm from './disable-two-factor-auth-form'

type Props = DialogProps

const Header = styled.h1`
  font-size: ${rem(20)};
  font-weight: 700;
  margin: 0 0 ${rem(20)} 0;
`

const Columns = styled.div`
  display: flex;
  margin-top: ${rem(30)};
`

const Column = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 50%;
  flex-direction: column;
  justify-content: center;
`

const DisableTwoFactorAuthDialog: React.FunctionComponent<Props> = ({
  onDismiss,
  ...props
}: Props) => (
  <Dialog onDismiss={onDismiss} {...props}>
    <Header>Disable 2-Factor Authentication</Header>
    Your account is more secure when you need a password and a verification code
    to sign in. If you remove this extra layer of security, you will only be
    asked for a password when you sign in. It might be easier for someone to
    break into your account.
    <Columns>
      <Column />
      <Column>
        <DisableTwoFactorAuthForm onCompleted={onDismiss} />
      </Column>
    </Columns>
  </Dialog>
)

export default DisableTwoFactorAuthDialog
