import { useQuery } from '@apollo/react-hooks'
import { FieldValidator, useField, useFormikContext } from 'formik'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import Option from 'components/option'
import BaseSelect, { Props as SelectProps } from 'components/select'
import { validateSelect } from 'utilities/validation'
import data, { Alpha2Code } from './data'
import { CountriesQueryData, countriesQuery } from './graphql'
import { usePhoneFieldContext } from '.'

interface Props
  extends Omit<SelectProps, 'children' | 'isDisabled' | 'isRequired' | 'name'> {
  validate?: FieldValidator
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
  const { onChange, ...field } = useField<Alpha2Code>(`${name}.alpha2Code`)[0]
  const { registerField, unregisterField } = useFormikContext()

  const { data: { countries = [] } = {}, loading } = useQuery<
    CountriesQueryData
  >(countriesQuery)

  const defaultValidate = React.useCallback<FieldValidator>(
    (value: string) => validateSelect(value, { isRequired }),
    [isRequired]
  )

  React.useEffect(
    () =>
      dispatch({
        payload: { placeholder: data[field.value as Alpha2Code] },
        type: 'setPlaceholder',
      }),
    [dispatch, field.value]
  )

  React.useEffect(() => {
    registerField(`${name}.alpha2Code`, {
      validate: validate || defaultValidate,
    })

    return () => unregisterField(`${name}.alpha2Code`)
  }, [defaultValidate, name, registerField, unregisterField, validate])

  return (
    <Root
      aria-labelledby={labelId}
      isDisabled={isDisabled}
      isLoading={loading}
      isRequired={isRequired}
      onChange={({ target }) => {
        dispatch({
          payload: { placeholder: data[target.value as Alpha2Code] },
          type: 'setPlaceholder',
        })

        return onChange(`${name}.alpha2Code`)(target.value)
      }}
      ref={ref}
      {...field}
      {...props}
    >
      {countries.map(({ alpha2Code, callingCode, name }) => (
        <Option key={alpha2Code} value={alpha2Code}>
          {`${name} +${callingCode}`}
        </Option>
      ))}
    </Root>
  )
}

export default React.forwardRef(Select)
