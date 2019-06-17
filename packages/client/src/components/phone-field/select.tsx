import { Omit } from '@fintruth-sdk/common'
import { useField } from 'formik'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import Option from 'components/option'
import BaseSelect, { Props as SelectProps } from 'components/select'
import data from './data'
import { PhoneValue, usePhoneFieldContext } from '.'

type Props = Omit<SelectProps, 'isRequired' | 'name' | 'variant'>

const Root = styled(BaseSelect)`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const Select: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLSelectElement>
) => {
  const [{ isRequired, name }, dispatch] = usePhoneFieldContext()
  const { onBlur, onChange, value, ...field } = useField<PhoneValue>(name)[0]

  React.useEffect(() => {
    const { placeholder = '' } =
      data.find(({ alpha2Code }) => alpha2Code === value.alpha2Code) || {}

    return dispatch({ type: 'setPlaceholder', value: placeholder })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Root
      isRequired={isRequired}
      onBlur={event => {
        onBlur(`${name}.alpha2Code`)(event)
        onBlur(`${name}.callingCode`)(event)

        return onBlur(`${name}.countryName`)(event)
      }}
      onChange={({ target }) => {
        const { alpha2Code, callingCode, countryName, placeholder } = data[
          target.selectedIndex
        ]

        onChange(`${name}.alpha2Code`)(alpha2Code)
        onChange(`${name}.callingCode`)(callingCode)
        onChange(`${name}.countryName`)(countryName)

        return dispatch({ type: 'setPlaceholder', value: placeholder })
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
