import { FieldAttributes, FieldValidator, useField } from 'formik'
import React from 'react'
import { useUIDSeed } from 'react-uid'

import BaseInput, { Props as InputProps } from 'components/input'
import { validateInput } from 'utils/validation'
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
  { id, mask = defaultMask, type = 'tel', validate, ...props }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const [
    { controlId, isDisabled, isRequired, name, placeholder },
    dispatch,
  ] = usePhoneFieldContext()
  const [field, { error, touched }] = useField<FieldAttributes<any>>({
    name: `${name}.number`,
    type,
    validate:
      validate ||
      ((value: string) => validateInput(value, { isRequired, type })),
  })
  const seed = useUIDSeed()

  React.useEffect(
    () =>
      dispatch({
        payload: { controlId: id || seed(`${name}.number`) },
        type: 'setControlId',
      }),
    [dispatch, id, name, seed]
  )

  return (
    <BaseInput
      id={controlId}
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
