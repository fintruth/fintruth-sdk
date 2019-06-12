import { Omit } from '@fintruth-sdk/common'
import { useField } from 'formik'
import React from 'react'
import styled from 'styled-components'

import { help } from 'styles/mixins'
import { useTextFieldContext } from '.'

interface Props
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
}

const Root = styled.p`
  ${({ theme }) => help(theme.danger)};
`

const Help: React.RefForwardingComponent<HTMLParagraphElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLParagraphElement>
) => {
  const { name } = useTextFieldContext()
  const { error, touched } = useField(name)[1]

  return error && touched ? (
    <Root ref={ref} {...props}>
      {error}
    </Root>
  ) : null
}

export default React.forwardRef(Help)
