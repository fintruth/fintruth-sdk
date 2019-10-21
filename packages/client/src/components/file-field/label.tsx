import React from 'react'
import styled from 'styled-components'

import { useFileFieldContext } from '.'

type Props = React.LabelHTMLAttributes<HTMLLabelElement>

const Root = styled.label`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Label = React.forwardRef<HTMLLabelElement, Props>(function Label(
  props: Props,
  ref?: React.Ref<HTMLLabelElement>
) {
  const { controlId } = useFileFieldContext()[0]

  return (
    <Root htmlFor={controlId} data-file-field-label="" ref={ref} {...props} />
  )
})

export default Label
