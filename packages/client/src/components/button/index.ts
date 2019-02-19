import styled, { css } from 'styled-components'
import { darken, getLuminance, rem } from 'polished'

import { azure, raven, white } from 'styles/variables'

interface Props {
  isOutlined?: boolean
  status?: string
}

interface StatusColors {
  [key: string]: string
  default: string
  primary: string
}

const statusColors: StatusColors = {
  default: white,
  primary: azure,
}

const Button = styled.button`
  border-radius: ${rem(2)};
  border-style: solid;
  border-width: ${rem(1)};
  cursor: pointer;
  font-size: ${rem(12)};
  font-weight: 700;
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
  }}
`

export default Button
