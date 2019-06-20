import { useField, useFormikContext, Validate } from 'formik'
import React from 'react'

import BaseInput, { Props as InputProps } from 'components/input'
import { validateInput } from 'utilities/validation'
import { usePhoneFieldContext } from '.'

interface Props
  extends Omit<
    InputProps,
    'isDisabled' | 'isRequired' | 'name' | 'placeholder'
  > {
  validate?: Validate
}

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  {
    mask = new Array(30).fill(/[-,.()\d\setx]/),
    type = 'tel',
    validate,
    ...props
  }: Props,
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
  const formik = useFormikContext()

  const defaultValidate = React.useCallback<Validate>(
    (value: string) => validateInput(value, { isRequired, type }),
    [isRequired, type]
  )

  React.useEffect(() => {
    formik.registerField(`${name}.number`, {
      validate: validate || defaultValidate,
    })

    return () => formik.unregisterField(`${name}.number`)
  }, [defaultValidate, formik, name, validate])

  return (
    <BaseInput
      aria-labelledby={labelId}
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
