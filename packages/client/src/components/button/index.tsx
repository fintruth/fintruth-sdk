import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { darken, getLuminance, rem } from 'polished'

import { azure, raven, watermelon, white } from 'styles/variables'

interface LoadingProps {
  isOutlined?: boolean
  status?: string
}

interface Props
  extends LoadingProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

interface StatusColors {
  [key: string]: string
  danger: string
  default: string
  primary: string
}

const statusColors: StatusColors = {
  danger: watermelon,
  default: raven,
  primary: azure,
}

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

  ${({ isOutlined, status = 'default' }: Props) => {
    const statusColor = statusColors[status] || statusColors['default']

    return isOutlined
      ? css`
          background-color: transparent;
          border-color: ${statusColor};
          color: ${statusColor};

          &:hover {
            border-color: ${darken(0.05, statusColor)};
            color: ${darken(0.05, statusColor)};
          }

          &:active {
            border-color: ${darken(0.1, statusColor)};
            color: ${darken(0.1, statusColor)};
          }
        `
      : css`
          background-color: ${statusColor};
          border-color: transparent;
          color: ${getLuminance(statusColor) >= getLuminance(white)
            ? raven
            : white};

          &:hover {
            background-color: ${darken(0.05, statusColor)};
          }

          &:active {
            background-color: ${darken(0.1, statusColor)};
          }
        `
  }};

  ${({ isLoading }: Props) =>
    isLoading &&
    css`
      color: transparent;

      &:hover {
        color: transparent;
      }

      &:active {
        color: transparent;
      }
    `};
`

const Loading = styled.div`
  animation: ${rotate} 1s ease-in-out infinite;
  height: ${rem(12)};
  margin: 0 auto;
  position: absolute;
  width: ${rem(12)};

  &::after {
    background-color: ${({ isOutlined, status = 'default' }: LoadingProps) => {
      const statusColor = statusColors[status] || statusColors['default']

      if (isOutlined) {
        return statusColor
      }

      return getLuminance(statusColor) >= getLuminance(white) ? raven : white
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
  isLoading,
  isOutlined,
  status,
  ...rest
}: Props) => (
  <Root isLoading={isLoading} isOutlined={isOutlined} status={status} {...rest}>
    {isLoading && <Loading isOutlined={isOutlined} status={status} />}
    {children}
  </Root>
)

export default Button
