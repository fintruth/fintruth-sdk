import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseLabel, { Props as LabelProps } from 'components/label'
import { useFieldContext } from '.'

type Props = Omit<LabelProps, 'isRequired'>

const Root = styled(BaseLabel)`
  font-size: inherit;

  &:not(:last-child) {
    margin-bottom: ${rem(8)};
  }
`

const Label = React.forwardRef<HTMLLabelElement, Props>(function Label(
  props: Props,
  ref?: React.Ref<HTMLLabelElement>
) {
  const { controlId, isRequired } = useFieldContext()[0]

  return (
    <Root
      data-field-label=""
      htmlFor={controlId}
      isRequired={isRequired}
      ref={ref}
      {...props}
    />
  )
})

export default Label
