import React from 'react'
import styled, { InputStatus } from 'styled-components' // eslint-disable-line import/named
import { rem } from 'polished'
import { useField } from 'formik'

import Label from 'components/label'
import Notice from 'components/notice'
import { control } from 'styles/mixins'

interface Props
  extends Exclude<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'required'
  > {
  id: string
  isDisabled?: boolean
  isRequired?: boolean
  label?: string
  name: string
  type?: 'email' | 'password' | 'tel' | 'text'
}

const Root = styled.div`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const Control = styled.div`
  box-sizing: border-box;
  clear: both;
  font-size: ${rem(16)};
  position: relative;
  text-align: left;
`

const BaseInput = styled.input<{ status: InputStatus }>`
  ${control};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-color: ${({ status, theme }) => theme.input[status].borderColor};
  border-radius: ${({ theme }) => theme.input.radius};
  box-shadow: ${({ theme }) => theme.input.boxShadow};
  color: ${({ theme }) => theme.input.color};
  display: block;
  max-width: 100%;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholderColor};
  }

  &:hover {
    border-color: ${({ status, theme }) =>
      status !== 'default'
        ? theme.input[status].borderColor
        : theme.input.hoverBorderColor};
  }

  &:focus,
  &:active {
    border-color: ${({ status, theme }) =>
      status !== 'default'
        ? theme.input[status].borderColor
        : theme.input.focusBorderColor};
    box-shadow: ${({ status, theme }) =>
      `${theme.input.focusBoxShadowSize} ${
        theme.input[status].focusBoxShadowColor
      }`};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${({ theme }) => theme.input.disabledBackgroundColor};
    border-color: ${({ theme }) => theme.input.disabledBorderColor};
    box-shadow: none;
    color: ${({ theme }) => theme.input.disabledColor};

    &::placeholder {
      color: ${({ theme }) => theme.input.disabledPlaceholderColor};
    }
  }

  &[readonly] {
    box-shadow: none;
  }
`

const Input: React.FunctionComponent<Props> = ({
  className,
  id,
  isDisabled,
  isRequired = true,
  label,
  name,
  type = 'text',
  ...props
}: Props) => {
  const [field, { error, touched }] = useField(name)

  return (
    <Root className={className}>
      {label && (
        <Label htmlFor={id} isRequired={isRequired}>
          {label}
        </Label>
      )}
      <Control>
        <BaseInput
          {...field}
          id={id}
          type={type}
          status={error && touched ? 'danger' : 'default'}
          {...props}
          disabled={isDisabled}
        />
      </Control>
      {error && touched && <Notice variant="danger">{error}</Notice>}
    </Root>
  )
}

export default Input
