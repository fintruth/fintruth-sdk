import { Omit } from '@fintruth-sdk/common'
import { useField } from 'formik'
import React from 'react'

import BaseSelect, { Props as SelectProps } from 'components/select'
import { useFieldContext } from '.'

type Props = Omit<SelectProps, 'isRequired' | 'name' | 'variant'>

const Select: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLSelectElement>
) => {
  const { isRequired, name } = useFieldContext()
  const [field, { error, touched }] = useField<string>(name)

  return (
    <BaseSelect
      isRequired={isRequired}
      ref={ref}
      variant={error && touched ? 'danger' : undefined}
      {...field}
      {...props}
    />
  )
}

export default React.forwardRef(Select)
