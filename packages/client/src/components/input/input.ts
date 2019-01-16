import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { heather, kiwi, seafoam, watermelon } from 'styles/variables'

interface Props {
  status?: string
}

const Input = styled.input`
  border-image: linear-gradient(to right, ${seafoam}, ${kiwi}) 1 / 0 0 ${rem(1)}
    0;
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
    border-image-width: 0 0 ${rem(2)} 0;
    padding-bottom: ${rem(9)};
  }

  &::placeholder {
    color: ${heather};
    font-style: italic;
  }
`

export default Input
