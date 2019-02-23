import React from 'react'
import styled from 'styled-components'
import { Dialog, DialogProps } from '@reach/dialog'
import { darken, rem } from 'polished'

import { link } from 'styles/mixins'
import { white, azure } from 'styles/variables'
import ConfirmTwoFactorAuthAppForm from './confirm-two-factor-auth-app-form'

interface Props extends DialogProps {
  dataUrl?: string
  secret?: string
}

interface QRCodeProps {
  isVisible: boolean
}

interface SecretProps {
  isVisible: boolean
}

const Header = styled.h1`
  font-size: ${rem(20)};
  font-weight: 700;
  margin: 0 0 ${rem(20)} 0;
`

const Link = styled.a`
  ${link}
  font-size: unset;
`

const SecretContainer = styled.div`
  margin-top: ${rem(10)};
`

const ColumnContainer = styled.div`
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

const QRCodeContainer = styled.div`
  background-color: ${darken(0.026, white)};
  margin-top: ${rem(10)};
`

const QRCode = styled.img`
  height: ${rem(200)};
  opacity: ${({ isVisible }: QRCodeProps) => (isVisible ? 1 : 0)};
  width: ${rem(200)};
`

const Button = styled.button`
  background-color: unset;
  border: unset;
  color: ${azure};
  cursor: pointer;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
`

const Secret = styled.span`
  background-color: ${darken(0.026, white)};
  display: ${({ isVisible }: SecretProps) =>
    isVisible ? 'inline-block' : 'none'};
  font-family: 'Helvetica Neue', 'Raleway', sans-serif;
  margin-top: ${rem(5)};
  padding: ${rem(5)} ${rem(8)};
`

const AuthyLink: React.FunctionComponent = ({ ...rest }) => (
  <Link
    {...rest}
    href="https://support.authy.com/hc/en-us/articles/360006303934-Add-a-New-Two-Factor-Authentication-2FA-Account-Token-in-the-Authy-App"
    rel="noopener noreferrer"
    target="_blank"
  >
    Authy
  </Link>
)

const LastPassLink: React.FunctionComponent = ({ ...rest }) => (
  <Link
    {...rest}
    href="https://support.logmeininc.com/lastpass/help/lastpass-authenticator-lp030014"
    rel="noopener noreferrer"
    target="_blank"
  >
    LastPass
  </Link>
)

const OnePasswordLink: React.FunctionComponent = ({ ...rest }) => (
  <Link
    {...rest}
    href="https://support.1password.com/one-time-passwords"
    rel="noopener noreferrer"
    target="_blank"
  >
    1Password
  </Link>
)

const EnableTwoFactorAuthAppDialog: React.FunctionComponent<Props> = ({
  dataUrl,
  onDismiss,
  secret,
  ...rest
}: Props) => {
  const [isQRCodeVisible, setIsQRCodeVisible] = React.useState(false)
  const [isSecretVisible, setIsSecretVisible] = React.useState(false)

  return (
    <Dialog onDismiss={onDismiss} {...rest}>
      <Header>Enable 2-Factor Authentication</Header>
      We recommend using an application such as <AuthyLink />,{' '}
      <OnePasswordLink />
      , or <LastPassLink /> Authenticator. These applications support secure
      backup of your verification codes in the cloud and can be restored if you
      lose access to your device. Scan the QR code below with the application of
      your choosing to begin.
      <SecretContainer>
        Alternatively, you can type the secret key.{' '}
        <Button onClick={() => setIsSecretVisible(!isSecretVisible)}>
          {isSecretVisible ? 'Hide' : 'Show'} secret key
        </Button>
        <Secret isVisible={isSecretVisible}>{secret}</Secret>
      </SecretContainer>
      <ColumnContainer>
        <Column>
          <Button onClick={() => setIsQRCodeVisible(!isQRCodeVisible)}>
            {isQRCodeVisible ? 'Hide' : 'Show'} QR code
          </Button>
          <QRCodeContainer>
            <QRCode alt="QR Code" isVisible={isQRCodeVisible} src={dataUrl} />
          </QRCodeContainer>
        </Column>
        <Column>
          <ConfirmTwoFactorAuthAppForm onCompleted={onDismiss} />
        </Column>
      </ColumnContainer>
    </Dialog>
  )
}

export default EnableTwoFactorAuthAppDialog
