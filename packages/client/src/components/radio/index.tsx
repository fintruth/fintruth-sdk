import React from 'react'
import styled, { css } from 'styled-components'
import { em } from 'polished'
import { useField } from 'formik'

interface Props
  extends Exclude<
    React.InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'disabled' | 'type'
  > {
  id: string
  isDisabled?: boolean
  label?: string
  name: string
  value: string
}

const Root = styled.div`
  align-items: center;
  display: inline-flex;

  & + & {
    margin-left: ${em(8)};
  }
`

const shared = css`
  border-radius: 100%;
  height: 20px;
  width: 20px;
`

const Input = styled.input`
  ${shared};
  cursor: pointer;
  opacity: 0;
  position: absolute;

  &[disabled],
  fieldset[disabled] & {
    cursor: not-allowed;
  }
`

const Toggle = styled.div`
  ${shared};
  align-items: center;
  border: 2px solid ${({ theme }) => theme.radio.toggleColor};
  display: flex;
  justify-content: center;

  ::before {
    border-radius: 100%;
    content: '';
    height: 10px;
    width: 10px;

    input[checked] ~ & {
      background-color: ${({ theme }) => theme.radio.toggleCheckedColor};
    }

    input[checked][disabled] ~ & {
      background-color: ${({ theme }) => theme.radio.toggleDisabledColor};
    }
  }

  input[checked] ~ & {
    border-color: ${({ theme }) => theme.radio.toggleCheckedColor};
  }

  input[disabled] ~ & {
    border-color: ${({ theme }) => theme.radio.toggleDisabledColor};
  }
`

const Label = styled.label`
  cursor: pointer;
  display: inline-block;
  line-height: 1.25;
  margin-left: ${em(4)};

  :hover {
    color: ${({ theme }) => theme.radio.hoverColor};
  }

  input[disabled] ~ &,
  fieldset[disabled] & {
    color: ${({ theme }) => theme.radio.disabledColor};
    cursor: not-allowed;
  }
`

const Radio: React.FunctionComponent<Props> = ({
  className,
  id,
  isDisabled,
  label,
  name,
  value,
  ...props
}: Props) => {
  const [{ value: fieldValue, ...field }] = useField(name)

  return (
    <Root className={className}>
      <Input
        {...field}
        id={id}
        value={value}
        {...props}
        checked={value === fieldValue}
        disabled={isDisabled}
        type="radio"
      />
      <Toggle />
      <Label htmlFor={id}>{label}</Label>
    </Root>
  )
}

export default Radio
