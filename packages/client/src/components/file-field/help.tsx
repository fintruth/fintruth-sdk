import { useField } from 'formik'
import React from 'react'
import styled from 'styled-components'

import { help } from 'styles/mixins'
import { useFileFieldContext } from '.'

type Props = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'>

const Root = styled.p`
  ${({ theme }) => help(theme.danger)}
`

const Help: React.RefForwardingComponent<HTMLParagraphElement, Props> = (
  props: Props,
  ref?: React.Ref<HTMLParagraphElement>
) => {
  const { name } = useFileFieldContext()[0]
  const { error, touched } = useField(name)[1]

  return error && touched ? (
    <Root data-file-field-help="" ref={ref} {...props}>
      {error}
    </Root>
  ) : null
}

export default React.forwardRef(Help)
