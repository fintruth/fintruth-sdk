import { useQuery } from '@apollo/react-hooks'
import { FieldAttributes, FieldValidator, useField } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import BaseSelect, { Props as SelectProps } from 'components/select'
import { validateSelect } from 'utils/validation'
import { option } from 'styles/mixins'
import { country } from 'translations'
import { CountriesQueryData, countriesQuery } from './graphql'
import { useFieldContext } from '.'

type Alpha2Code = keyof typeof country.name

interface Props
  extends Omit<
    SelectProps,
    'children' | 'isDisabled' | 'isLoading' | 'isRequired' | 'name'
  > {
  exclude?: Alpha2Code[]
  placeholder?: string
  validate?: FieldValidator
}

const Option = styled.option`
  ${option};
`

const CountrySelect: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  { exclude = [], isMultiple, placeholder, validate, ...props }: Props,
  ref?: React.Ref<HTMLSelectElement>
) => {
  const { isDisabled, isRequired, labelId, name } = useFieldContext()[0]
  const [{ multiple: _, ...field }, { error, touched }] = useField<
    FieldAttributes<any>
  >({
    as: 'select',
    multiple: isMultiple,
    name,
    validate:
      validate || ((value: string) => validateSelect(value, { isRequired })),
  })
  const { formatMessage } = useIntl()

  const {
    data: { countries = [] } = {},
    loading: isQueryingCountries,
  } = useQuery<CountriesQueryData>(countriesQuery)

  return (
    <BaseSelect
      aria-labelledby={labelId}
      data-field-country-select=""
      isDisabled={isDisabled}
      isLoading={isQueryingCountries}
      isMultiple={isMultiple}
      isRequired={isRequired}
      ref={ref}
      variant={error && touched ? 'danger' : undefined}
      {...field}
      {...props}
    >
      {placeholder && <Option value="">{placeholder}</Option>}
      {countries
        .filter(
          ({ alpha2Code }) =>
            !exclude.includes(alpha2Code.toLowerCase() as Alpha2Code)
        )
        .map(({ alpha2Code, name }) => (
          <Option key={alpha2Code} value={name}>
            {formatMessage(
              country.name[alpha2Code.toLowerCase() as Alpha2Code]
            )}
          </Option>
        ))}
    </BaseSelect>
  )
}

export default React.forwardRef(CountrySelect)
