import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { heather, watermelon } from 'styles/variables'

interface Props {
  status?: string
}

const Input = styled.input`
  border-bottom-color: ${heather};
  border-width: 0 0 ${rem(1)} 0;
  font-size: ${rem(14)};
  font-weight: 500;
  outline: none;
  padding: ${rem(9)} 0 ${rem(10)};
  width: 100%;

  ${({ status = 'default' }: Props) =>
    status === 'invalid' &&
    css`
      border-bottom-color: ${watermelon};
      border-image: unset;
    `}

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
