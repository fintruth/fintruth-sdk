import styled from 'styled-components'
import { rem } from 'polished'

import { heather, watermelon } from 'styles/variables'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: string
}

interface StatusColors {
  [key: string]: string
  default: string
  failure: string
}

const statusColors: StatusColors = {
  default: heather,
  failure: watermelon,
}

const Input = styled.input`
  border-bottom-color: ${({ status = 'default' }: Props) =>
    statusColors[status] || statusColors['default']};
  border-width: 0 0 ${rem(1)} 0;
  font-size: ${rem(14)};
  font-weight: 500;
  outline: none;
  padding: ${rem(9)} 0 ${rem(10)};
  width: 100%;

  &:active,
  &:focus {
    border-bottom-width: ${rem(2)};
    padding-bottom: ${rem(9)};
  }

  &::placeholder {
    color: ${heather};
    font-style: italic;
  }
`

export default Input
