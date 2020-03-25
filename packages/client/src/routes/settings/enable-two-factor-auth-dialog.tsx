import { darken, rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import Dialog, { Props as DialogProps } from 'components/dialog'
import { link } from 'styles/mixins'
import ConfirmTwoFactorAuthForm from './confirm-two-factor-auth-form'

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

const Link = styled.a.attrs((attrs) => ({
  rel: 'noopener noreferrer',
  target: '_blank',
  ...attrs,
}))`
  ${link}
  font-size: unset;
`

const Secrets = styled.div`
  margin-top: ${rem(10)};
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

const QRCodes = styled.div`
  background-color: ${({ theme }) => darken(0.026, theme.white)};
  margin-top: ${rem(10)};
`

const QRCode = styled.img<QRCodeProps>`
  height: ${rem(200)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  width: ${rem(200)};
`

const Button = styled.button`
  background-color: unset;
  border: unset;
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
`

const Secret = styled.span<SecretProps>`
  background-color: ${({ theme }) => darken(0.026, theme.white)};
  display: ${({ isVisible }) => (isVisible ? 'inline-block' : 'none')};
  font-family: 'Helvetica Neue', 'Raleway', sans-serif;
  margin-top: ${rem(5)};
  padding: ${rem(5)} ${rem(8)};
`

const EnableTwoFactorAuthDialog: React.FunctionComponent<Props> = ({
  dataUrl,
  onDismiss,
  secret,
  ...props
}: Props) => {
  const [isQRCodeVisible, setIsQRCodeVisible] = React.useState(false)
  const [isSecretVisible, setIsSecretVisible] = React.useState(false)

  return (
    <Dialog onDismiss={onDismiss} {...props}>
      <Header>Enable 2-Factor Authentication</Header>
      We recommend using an application such as{' '}
      <Link href="https://bit.ly/2ODCBad">Authy</Link>,{' '}
      <Link href="https://bit.ly/2YCLrc9">1Password</Link>, or{' '}
      <Link href="https://bit.ly/2KkL2Sj">LastPass</Link> Authenticator. These
      applications support secure backup of your verification codes in the cloud
      and can be restored if you lose access to your device. Scan the QR code
      below with the application of your choosing to begin.
      <Secrets>
        Alternatively, you can type the secret key.{' '}
        <Button onClick={() => setIsSecretVisible(!isSecretVisible)}>
          {isSecretVisible ? 'Hide' : 'Show'} secret key
        </Button>
        <Secret isVisible={isSecretVisible}>{secret}</Secret>
      </Secrets>
      <Columns>
        <Column>
          <Button onClick={() => setIsQRCodeVisible(!isQRCodeVisible)}>
            {isQRCodeVisible ? 'Hide' : 'Show'} QR code
          </Button>
          <QRCodes>
            <QRCode alt="QR Code" isVisible={isQRCodeVisible} src={dataUrl} />
          </QRCodes>
        </Column>
        <Column>
          <ConfirmTwoFactorAuthForm onCompleted={onDismiss} />
        </Column>
      </Columns>
    </Dialog>
  )
}

export default EnableTwoFactorAuthDialog
