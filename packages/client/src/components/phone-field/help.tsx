import { useField } from 'formik'
import React from 'react'
import styled from 'styled-components'

import { help } from 'styles/mixins'
import { usePhoneFieldContext } from '.'

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
  const { name } = usePhoneFieldContext()[0]
  const { error, touched } = useField(`${name}.number`)[1]

  return error && touched ? (
    <Root {...props} ref={ref}>
      {error}
    </Root>
  ) : null
}

export default React.forwardRef(Help)
