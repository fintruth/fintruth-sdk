import { useField, useFormikContext, Validate } from 'formik'
import React from 'react'

import BaseSelect, { Props as SelectProps } from 'components/select'
import { validateSelect } from 'utilities/validation'
import { useFieldContext } from '.'

interface Props
  extends Omit<SelectProps, 'isDisabled' | 'isRequired' | 'name'> {
  validate?: Validate
}

const Select: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  { validate, ...props }: Props,
  ref: React.Ref<HTMLSelectElement>
) => {
  const { isDisabled, isRequired, labelId, name } = useFieldContext()[0]
  const [field, { error, touched }] = useField<string>(name)
  const { registerField, unregisterField } = useFormikContext()

  const defaultValidate = React.useCallback<Validate>(
    (value: string) => validateSelect(value, { isRequired }),
    [isRequired]
  )

  React.useEffect(() => {
    registerField(name, { validate: validate || defaultValidate })

    return () => unregisterField(name)
  }, [defaultValidate, name, registerField, unregisterField, validate])

  return (
    <BaseSelect
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
