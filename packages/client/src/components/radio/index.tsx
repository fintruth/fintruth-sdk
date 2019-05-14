import { Omit } from '@fintruth-sdk/shared'
import { useField } from 'formik'
import { em, transparentize } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

interface Props
  extends Omit<
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
  display: inline-block;
  line-height: 1.25;
  position: relative;

  & + & {
    margin-left: ${em(8)};
  }
`

const shared = css`
  border-radius: ${({ theme }) => theme.borderRadiusRounded};
  height: ${em(20)};
  width: ${em(20)};
`

const Input = styled.input`
  ${shared};
  cursor: pointer;
  font-size: ${em(16)};
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
  border: 2px solid ${({ theme }) => theme.textColor};
  display: inline-flex;
  justify-content: center;

  &::before {
    border-radius: ${({ theme }) => theme.borderRadiusRounded};
    content: '';
    height: ${em(10)};
    width: ${em(10)};

    input[checked] ~ & {
      background-color: ${({ theme }) => theme.linkColor};
    }

    input[checked][disabled] ~ & {
      background-color: ${({ theme }) => theme.textLightColor};
    }
  }

  input:focus ~ &,
  input:active ~ & {
    border-color: ${({ theme }) => theme.linkColor};
    box-shadow: 0 0 0 ${em(2)}
      ${({ theme }) => transparentize(0.75, theme.linkColor)};
  }

  input[checked] ~ & {
    border-color: ${({ theme }) => theme.linkColor};
  }

  input[disabled] ~ & {
    border-color: ${({ theme }) => theme.textLightColor};
    box-shadow: none;
  }
`

const Label = styled.label`
  cursor: pointer;
  margin-left: ${em(4)};

  &:hover,
  input:hover ~ & {
    color: ${({ theme }) => theme.grayDarker};
  }

  input[disabled] ~ &,
  fieldset[disabled] & {
    color: ${({ theme }) => theme.textLightColor};
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
  const [{ value: fieldValue, ...field }] = useField<string>(name)

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
