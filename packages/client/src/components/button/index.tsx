import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { darken, readableColor, rem } from 'polished'

import { azure, raven, watermelon, white } from 'styles/variables'

export type Status = 'danger' | 'default' | 'primary'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  delay?: number
  isLoading?: boolean
  isOutlined?: boolean
  status?: Status
}

const statusColors: Record<Status, string> = {
  danger: watermelon,
  default: raven,
  primary: azure,
}

const resolveColor = (isLoading: boolean, color: string) =>
  isLoading ? 'transparent' : color

const getOutlinedStyles = (isLoading: boolean, statusColor: string) => {
  const color = resolveColor(isLoading, statusColor)

  return css`
    background-color: transparent;
    border-color: ${statusColor};
    color: ${color};

    &:hover {
      border-color: ${darken(0.05, statusColor)};
      color: ${darken(0.05, color)};
    }

    &:active {
      border-color: ${darken(0.1, statusColor)};
      color: ${darken(0.1, color)};
    }
  `
}

const getSolidStyles = (isLoading: boolean, statusColor: string) => css`
  background-color: ${statusColor};
  border-color: transparent;
  color: ${resolveColor(isLoading, readableColor(statusColor, raven, white))};

  &:hover {
    background-color: ${darken(0.05, statusColor)};
  }

  &:active {
    background-color: ${darken(0.1, statusColor)};
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`

const Root = styled.button`
  border-radius: ${rem(2)};
  border-style: solid;
  border-width: ${rem(1)};
  cursor: pointer;
  display: flex;
  font-size: ${rem(12)};
  font-weight: 700;
  justify-content: center;
  padding: ${rem(10)} ${rem(20)};

  ${({ isLoading = false, isOutlined, status = 'default' }: Props) => {
    const statusColor = statusColors[status]

    return isOutlined
      ? getOutlinedStyles(isLoading, statusColor)
      : getSolidStyles(isLoading, statusColor)
  }};
`

const Spinner = styled.div`
  animation: ${rotate} 1s ease-in-out infinite;
  height: ${rem(12)};
  margin: 0 auto;
  position: absolute;
  width: ${rem(12)};

  &::after {
    background-color: ${({ isOutlined, status = 'default' }: Props) => {
      const statusColor = statusColors[status]

      return isOutlined ? statusColor : readableColor(statusColor, raven, white)
    }};
    border-radius: 50%;
    content: '';
    height: ${rem(6)};
    left: 50%;
    margin-left: ${rem(-3)};
    position: absolute;
    top: ${rem(-3)};
    width: ${rem(6)};
  }
`

const Button: React.FunctionComponent<Props> = ({
  children,
  delay = 200,
  isLoading,
  isOutlined,
  status,
  ...props
}: Props) => {
  const [isSpinnerVisible, setIsSpinnerVisible] = React.useState(false)

  React.useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => setIsSpinnerVisible(true), delay)

      return () => clearTimeout(timeout)
    }

    setIsSpinnerVisible(false)

    return undefined
  }, [delay, isLoading])

  return (
    <Root
      isLoading={isSpinnerVisible}
      isOutlined={isOutlined}
      status={status}
      {...props}
    >
      {isSpinnerVisible && (
        <Spinner
          data-testid="spinner"
          isOutlined={isOutlined}
          status={status}
        />
      )}
      {children}
    </Root>
  )
}

export default Button
