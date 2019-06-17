import { Omit } from '@fintruth-sdk/common'
import { useField } from 'formik'
import React from 'react'

import BaseInput, { Props as InputProps } from 'components/input'
import { useFieldContext } from '.'

type Props = Omit<InputProps, 'isRequired' | 'name' | 'variant'>

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const { isRequired, name } = useFieldContext()
  const [field, { error, touched }] = useField<string>(name)

  return (
    <BaseInput
      isRequired={isRequired}
      ref={ref}
      variant={error && touched ? 'danger' : undefined}
      {...field}
      {...props}
    />
  )
}

export default React.forwardRef(Input)
