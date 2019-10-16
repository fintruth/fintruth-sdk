import { useField } from 'formik'
import React from 'react'
import styled from 'styled-components'

import { help } from 'styles/mixins'
import { usePhoneFieldContext } from '.'

type Props = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'>

const Root = styled.p`
  ${({ theme }) => help(theme.danger)}
`

const Help: React.RefForwardingComponent<HTMLParagraphElement, Props> = (
  props: Props,
  ref?: React.Ref<HTMLParagraphElement>
) => {
  const { name } = usePhoneFieldContext()[0]
  const { error, touched } = useField(`${name}.number`)[1]

  return error && touched ? (
    <Root data-phone-field-help="" {...props} ref={ref}>
      {error}
    </Root>
  ) : null
}

export default React.forwardRef(Help)
