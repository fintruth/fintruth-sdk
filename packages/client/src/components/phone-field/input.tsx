import { FieldValidator, useField, useFormikContext } from 'formik'
import React from 'react'

import BaseInput, { Props as InputProps } from 'components/input'
import { validateInput } from 'utilities/validation'
import { usePhoneFieldContext } from '.'

interface Props
  extends Omit<
    InputProps,
    'isDisabled' | 'isRequired' | 'name' | 'placeholder'
  > {
  validate?: FieldValidator
}

const defaultMask = new Array(30).fill(/[-,.()\d\setx]/)

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  { mask = defaultMask, type = 'tel', validate, ...props }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    isDisabled,
    isRequired,
    labelId,
    name,
    placeholder,
  } = usePhoneFieldContext()[0]
  const [field, { error, touched }] = useField<string>(`${name}.number`)
  const { registerField, unregisterField } = useFormikContext<any>()

  const defaultValidate = React.useCallback<FieldValidator>(
    (value: string) => validateInput(value, { isRequired, type }),
    [isRequired, type]
  )

  React.useEffect(() => {
    registerField(`${name}.number`, { validate: validate || defaultValidate })

    return () => unregisterField(`${name}.number`)
  }, [defaultValidate, name, registerField, unregisterField, validate])

  return (
    <BaseInput
      aria-labelledby={labelId}
      data-phone-field-input
      isDisabled={isDisabled}
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
