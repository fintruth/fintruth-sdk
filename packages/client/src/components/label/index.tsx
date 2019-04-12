import React from 'react'
import styled from 'styled-components'
import { em } from 'polished'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  isRequired?: boolean
}

const Root = styled.label`
  color: ${({ theme }) => theme.label.color};
  display: block;
  font-size: ${({ theme }) => theme.label.fontSize};
  font-weight: ${({ theme }) => theme.label.fontWeight};

  :not(:last-child) {
    margin-bottom: ${em(8)};
  }
`

const Label: React.FunctionComponent<Props> = ({
  children,
  isRequired = false,
  ...rest
}: Props) => (
  <Root {...rest}>
    {children}
    {isRequired && '*'}
  </Root>
)

export default Label
