import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseLabel from 'components/label'
import { useTextFieldContext } from '.'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  children: React.ReactNode
}

const Root = styled(BaseLabel)`
  font-size: inherit;

  &:not(:last-child) {
    margin-bottom: ${rem(8)};
  }
`

const Label: React.RefForwardingComponent<HTMLLabelElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLLabelElement>
) => {
  const { isRequired } = useTextFieldContext()

  return <Root isRequired={isRequired} ref={ref} {...props} />
}

export default React.forwardRef(Label)
