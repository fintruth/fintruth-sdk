import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

import { heather } from 'styles/variables'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  isRequired?: boolean
}

const Root = styled.label`
  color: ${heather};
  display: block;
  font-size: ${rem(12)};
  font-weight: 700;
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
