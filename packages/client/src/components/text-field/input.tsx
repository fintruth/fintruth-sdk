import { Omit } from '@fintruth-sdk/common'
import { useField } from 'formik'
import React from 'react'

import BaseInput, { Type } from 'components/input'
import { useTextFieldContext } from '.'

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'required'
  > {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  isDisabled?: boolean
  type?: Type
}

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const { isRequired, name } = useTextFieldContext()
  const [field, { error, touched }] = useField(name)

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
