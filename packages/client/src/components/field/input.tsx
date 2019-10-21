import { FieldAttributes, FieldValidator, useField } from 'formik'
import React from 'react'
import { useUIDSeed } from 'react-uid'

import BaseInput, { Props as InputProps } from 'components/input'
import { validateInput } from 'utils/validation'
import { useFieldContext } from '.'

interface Props extends Omit<InputProps, 'isDisabled' | 'isRequired' | 'name'> {
  validate?: FieldValidator
}

const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { id, type, validate, ...props }: Props,
  ref?: React.Ref<HTMLInputElement>
) {
  const [
    { controlId, isDisabled, isRequired, name },
    dispatch,
  ] = useFieldContext()
  const [field, { error, touched }] = useField<FieldAttributes<any>>({
    name,
    type,
    validate:
      validate ||
      ((value: string) => validateInput(value, { isRequired, type })),
  })
  const seed = useUIDSeed()

  React.useEffect(
    () =>
      dispatch({
        payload: { controlId: id || seed(name) },
        type: 'setControlId',
      }),
    [dispatch, id, name, seed]
  )

  return (
    <BaseInput
      id={controlId}
      data-field-input=""
      isDisabled={isDisabled}
      isRequired={isRequired}
      ref={ref}
      type={type}
      variant={error && touched ? 'danger' : undefined}
      {...field}
      {...props}
    />
  )
})

export default Input
