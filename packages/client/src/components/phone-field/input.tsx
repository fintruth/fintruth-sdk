import { Omit } from '@fintruth-sdk/common'
import { useField } from 'formik'
import React from 'react'

import BaseInput, { Props as InputProps } from 'components/input'
import { usePhoneFieldContext } from '.'

type Props = Omit<InputProps, 'isRequired' | 'name' | 'placeholder' | 'variant'>

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  {
    mask = new Array(20).fill(/[-,.()\d\setx]/),
    type = 'tel',
    ...props
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const { isRequired, name, placeholder } = usePhoneFieldContext()[0]
  const [field, { error, touched }] = useField<string>(`${name}.number`)

  return (
    <BaseInput
      isRequired={isRequired}
      mask={mask}
      placeholder={placeholder}
      ref={ref}
      type={type}
      variant={error && touched ? 'danger' : undefined}
      {...field}
      {...props}
    />
  )
}

export default React.forwardRef(Input)
