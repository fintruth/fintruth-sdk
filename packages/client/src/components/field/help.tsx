import { useField } from 'formik'
import React from 'react'
import styled from 'styled-components'

import { help } from 'styles/mixins'
import { useFieldContext } from '.'

type Props = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'>

const Root = styled.p`
  ${({ theme }) => help(theme.danger)}
`

const Help: React.RefForwardingComponent<HTMLParagraphElement, Props> = (
  props: Props,
  ref?: React.Ref<HTMLParagraphElement>
) => {
  const { name } = useFieldContext()[0]
  const { error, touched } = useField<string>(name)[1]

  return error && touched ? (
    <Root data-field-help="" ref={ref} {...props}>
      {error}
    </Root>
  ) : null
}

export default React.forwardRef(Help)
