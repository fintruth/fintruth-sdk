import { FieldValidator, useField, useFormikContext } from 'formik'
import React from 'react'

import BaseInput, { Props as InputProps } from 'components/input'
import { validateInput } from 'utils/validation'
import { useFieldContext } from '.'

interface Props extends Omit<InputProps, 'isDisabled' | 'isRequired' | 'name'> {
  validate?: FieldValidator
}

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  { validate, type, ...props }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const { isDisabled, isRequired, labelId, name } = useFieldContext()[0]
  const [field, { error, touched }] = useField<string>(name)
  const { registerField, unregisterField } = useFormikContext<any>()

  const defaultValidate = React.useCallback<FieldValidator>(
    (value: string) => validateInput(value, { isRequired, type }),
    [isRequired, type]
  )

  React.useEffect(() => {
    registerField(name, { validate: validate || defaultValidate })

    return () => unregisterField(name)
  }, [defaultValidate, name, registerField, unregisterField, validate])

  return (
    <BaseInput
      aria-labelledby={labelId}
      data-field-input
      isDisabled={isDisabled}
      isRequired={isRequired}
      ref={ref}
      type={type}
      variant={error && touched ? 'danger' : undefined}
      {...field}
      {...props}
    />
  )
}

export default React.forwardRef(Input)
