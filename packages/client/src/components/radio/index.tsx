import React from 'react'
import styled from 'styled-components'
import { em } from 'polished'

interface Props
  extends Exclude<
    React.InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'disabled' | 'type'
  > {
  id: string
  isChecked?: boolean
  isDisabled?: boolean
  label?: string
}

const Root = styled.div`
  align-items: center;
  display: inline-flex;

  & + & {
    margin-left: ${em(8)};
  }
`

const Input = styled.input`
  border-radius: 100%;
  cursor: pointer;
  height: 20px;
  opacity: 0;
  position: absolute;
  width: 20px;

  &:disabled,
  fieldset:disabled & {
    cursor: not-allowed;
  }
`

const Toggle = styled.div`
  align-items: center;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.radio.toggleColor};
  display: flex;
  height: 20px;
  justify-content: center;
  width: 20px;

  ::before {
    border-radius: 100%;
    content: '';
    height: 10px;
    width: 10px;

    input:checked ~ & {
      background-color: ${({ theme }) => theme.radio.toggleCheckedColor};
    }

    input:checked:disabled ~ & {
      background-color: ${({ theme }) => theme.radio.toggleDisabledColor};
    }
  }

  input:checked ~ & {
    border-color: ${({ theme }) => theme.radio.toggleCheckedColor};
  }

  input:disabled ~ & {
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

  input:disabled ~ &,
  fieldset:disabled & {
    color: ${({ theme }) => theme.radio.disabledColor};
    cursor: not-allowed;
  }
`

const Radio: React.FunctionComponent<Props> = ({
  className,
  id,
  isChecked,
  isDisabled,
  label,
  ...rest
}: Props) => (
  <Root className={className}>
    <Input
      id={id}
      {...rest}
      checked={isChecked}
      disabled={isDisabled}
      type="radio"
    />
    <Toggle />
    <Label htmlFor={id}>{label}</Label>
  </Root>
)

export default Radio
