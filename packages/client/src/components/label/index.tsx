import { em, rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  isRequired?: boolean
}

const Root = styled.label`
  color: ${({ theme }) => theme.grayDarker};
  display: block;
  font-size: ${rem(16)};
  font-weight: 700;

  &:not(:last-child) {
    margin-bottom: ${em(8)};
  }
`

const Label: React.FunctionComponent<Props> = ({
  children,
  isRequired,
  ...props
}: Props) => (
  <Root {...props}>
    {children}
    {isRequired && '*'}
  </Root>
)

export default Label
