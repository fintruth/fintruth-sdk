import styled from 'styled-components'
import { rem } from 'polished'

import { heather, watermelon } from 'styles/variables'

export type Status = 'default' | 'failure'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: Status
}

const statusColors: Record<Status, string> = {
  default: heather,
  failure: watermelon,
}

const Input = styled.input`
  background-color: transparent;
  border-bottom-color: ${({ status = 'default' }: Props) =>
    statusColors[status]};
  border-width: 0 0 ${rem(1)} 0;
  font-size: ${rem(14)};
  font-weight: 500;
  outline: none;
  padding: ${rem(8)} 0 ${rem(9)};
  width: 100%;

  &:active,
  &:focus {
    border-bottom-width: ${rem(2)};
    padding-bottom: ${rem(8)};
  }

  &::placeholder {
    color: ${heather};
    font-style: italic;
  }
`

export default Input
