import { FieldAttributes, FieldValidator, useField } from 'formik'
import React from 'react'
import { useUIDSeed } from 'react-uid'

import BaseSelect, { Props as SelectProps } from 'components/select'
import { validateSelect } from 'utils/validation'
import { useFieldContext } from '.'

interface Props
  extends Omit<SelectProps, 'isDisabled' | 'isRequired' | 'name'> {
  validate?: FieldValidator
}

const Select: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  { id, isMultiple, validate, ...props }: Props,
  ref?: React.Ref<HTMLSelectElement>
) => {
  const [
    { controlId, isDisabled, isRequired, name },
    dispatch,
  ] = useFieldContext()
  const [{ multiple: _multiple, ...field }, { error, touched }] = useField<
    FieldAttributes<any>
  >({
    as: 'select',
    multiple: isMultiple,
    name,
    validate:
      validate || ((value: string) => validateSelect(value, { isRequired })),
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
    <BaseSelect
      id={controlId}
      data-field-select=""
      isDisabled={isDisabled}
      isMultiple={isMultiple}
      isRequired={isRequired}
      ref={ref}
      variant={error && touched ? 'danger' : undefined}
      {...field}
      {...props}
    />
  )
}

export default React.forwardRef(Select)
