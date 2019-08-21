import { useQuery } from '@apollo/react-hooks'
import {
  FieldAttributes,
  FieldValidator,
  useField,
  useFormikContext,
} from 'formik'
import { rem } from 'polished'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import Option from 'components/option'
import BaseSelect, { Props as SelectProps } from 'components/select'
import { country } from 'translations'
import { validateSelect } from 'utils/validation'
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
  const { formatMessage } = useIntl()
  const { onChange, ...field } = useField<FieldAttributes<any>>({
    name: `${name}.alpha2Code`,
  })[0]
  const { registerField, unregisterField } = useFormikContext<any>()

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

  React.useEffect(() => {
    registerField(`${name}.alpha2Code`, {
      validate:
        validate || ((value: string) => validateSelect(value, { isRequired })),
    })

    return () => unregisterField(`${name}.alpha2Code`)
  }, [isRequired, name, registerField, unregisterField, validate])

  return (
    <Root
      aria-labelledby={labelId}
      data-phone-field-select
      isDisabled={isDisabled}
      isLoading={isQueryingCountries}
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
            country.name[alpha2Code.toLowerCase() as keyof typeof country.name]
          )} +${callingCode}`}
        </Option>
      ))}
    </Root>
  )
}

export default React.forwardRef(Select)
