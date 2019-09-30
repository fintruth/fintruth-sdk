import { useQuery } from '@apollo/react-hooks'
import { FieldAttributes, FieldValidator, useField } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import BaseSelect, { Props as SelectProps } from 'components/select'
import { option } from 'styles/mixins'
import { Alpha2Code, country } from 'translations'
import { validateSelect } from 'utils/validation'
import data from './data'
import { CountriesQueryData, countriesQuery } from './graphql'
import { usePhoneFieldContext } from '.'

interface Props
  extends Omit<
    SelectProps,
    'children' | 'isDisabled' | 'isLoading' | 'isRequired' | 'name'
  > {
  validate?: FieldValidator
}

const Root = styled(BaseSelect)`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const Option = styled.option`
  ${option};
`

const Select: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  { isMultiple, validate, ...props }: Props,
  ref?: React.Ref<HTMLSelectElement>
) => {
  const [
    { isDisabled, isRequired, labelId, name },
    dispatch,
  ] = usePhoneFieldContext()
  const { formatMessage } = useIntl()
  const { multiple: _, onChange, ...field } = useField<FieldAttributes<any>>({
    as: 'select',
    multiple: isMultiple,
    name: `${name}.alpha2Code`,
    validate:
      validate || ((value: string) => validateSelect(value, { isRequired })),
  })[0]

  const {
    data: { countries = [] } = {},
    loading: isQueryingCountries,
  } = useQuery<CountriesQueryData>(countriesQuery)

  React.useEffect(
    () =>
      dispatch({
        payload: { placeholder: data[field.value as Alpha2Code] },
        type: 'setPlaceholder',
      }),
    [dispatch, field.value]
  )

  return (
    <Root
      aria-labelledby={labelId}
      data-phone-field-select=""
      isDisabled={isDisabled}
      isLoading={isQueryingCountries}
      isMultiple={isMultiple}
      isRequired={isRequired}
      onChange={({ target: { value } }) => {
        dispatch({
          payload: { placeholder: data[value as Alpha2Code] },
          type: 'setPlaceholder',
        })

        return onChange(`${name}.alpha2Code`)(value)
      }}
      ref={ref}
      {...field}
      {...props}
    >
      {countries.map(({ alpha2Code, callingCode }) => (
        <Option key={alpha2Code} value={alpha2Code}>
          {`${formatMessage(
            country.name[alpha2Code as Alpha2Code]
          )} +${callingCode}`}
        </Option>
      ))}
    </Root>
  )
}

export default React.forwardRef(Select)
