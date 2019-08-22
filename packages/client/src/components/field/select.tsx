import { FieldAttributes, FieldValidator, useField } from 'formik'
import React from 'react'

import BaseSelect, { Props as SelectProps } from 'components/select'
import { validateSelect } from 'utils/validation'
import { useFieldContext } from '.'

interface Props
  extends Omit<SelectProps, 'isDisabled' | 'isRequired' | 'name'> {
  validate?: FieldValidator
}

const Select: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  { validate, ...props }: Props,
  ref: React.Ref<HTMLSelectElement>
) => {
  const { isDisabled, isRequired, labelId, name } = useFieldContext()[0]
  const [field, { error, touched }] = useField<FieldAttributes<any>>({
    name,
    validate:
      validate || ((value: string) => validateSelect(value, { isRequired })),
  })

  return (
    <BaseSelect
      data-field-select
      aria-labelledby={labelId}
      isDisabled={isDisabled}
      isRequired={isRequired}
      ref={ref}
      variant={error && touched ? 'danger' : undefined}
      {...field}
      {...props}
    />
  )
}

export default React.forwardRef(Select)
