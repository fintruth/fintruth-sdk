import { useField, useFormikContext, Validate } from 'formik'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import Option from 'components/option'
import BaseSelect, { Props as SelectProps } from 'components/select'
import { validateSelect } from 'utilities/validation'
import data from './data'
import { PhoneValue, usePhoneFieldContext } from '.'

interface Props
  extends Omit<SelectProps, 'children' | 'isDisabled' | 'isRequired' | 'name'> {
  validate?: Validate
}

const Root = styled(BaseSelect)`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const Select: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  { validate, ...props }: Props,
  ref: React.Ref<HTMLSelectElement>
) => {
  const [
    { isDisabled, isRequired, labelId, name },
    dispatch,
  ] = usePhoneFieldContext()
  const { onBlur, onChange, value, ...field } = useField<PhoneValue>(name)[0]
  const { registerField, unregisterField } = useFormikContext()

  const defaultValidate = React.useCallback<Validate>(
    (value: string) => validateSelect(value, { isRequired }),
    [isRequired]
  )

  React.useEffect(() => {
    const { placeholder = '' } =
      data.find(({ alpha2Code }) => alpha2Code === value.alpha2Code) || {}

    return dispatch({ payload: { placeholder }, type: 'setPlaceholder' })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    registerField(name, { validate: validate || defaultValidate })

    return () => unregisterField(name)
  }, [defaultValidate, name, registerField, unregisterField, validate])

  return (
    <Root
      aria-labelledby={labelId}
      isDisabled={isDisabled}
      isRequired={isRequired}
      onBlur={({ target }) => {
        const { placeholder, ...rest } = data[target.selectedIndex] // eslint-disable-line @typescript-eslint/no-unused-vars

        return Object.entries(rest).forEach(([key, value]) =>
          onBlur(`${name}.${key}`)(value)
        )
      }}
      onChange={({ target }) => {
        const { placeholder, ...rest } = data[target.selectedIndex]

        dispatch({ payload: { placeholder }, type: 'setPlaceholder' })

        return Object.entries(rest).forEach(([key, value]) =>
          onChange(`${name}.${key}`)(value)
        )
      }}
      ref={ref}
      value={value.alpha2Code}
      {...field}
      {...props}
    >
      {data.map(({ alpha2Code, callingCode, countryName }) => (
        <Option key={alpha2Code} value={alpha2Code}>
          {`${countryName} +${callingCode}`}
        </Option>
      ))}
    </Root>
  )
}

export default React.forwardRef(Select)
