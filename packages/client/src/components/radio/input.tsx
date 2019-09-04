import { FieldAttributes, useField } from 'formik'
import { em, transparentize } from 'polished'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { css } from 'styled-components'

import { useRadioContext } from '.'

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'disabled' | 'required' | 'type'
  > {
  value: string
}

const type = 'radio'

const shared = css`
  border-radius: ${({ theme }) => theme.borderRadiusRounded};
  height: ${em(20)};
  width: ${em(20)};
`

const Root = styled.input`
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

    input:checked ~ & {
      background-color: ${({ theme }) => theme.linkColor};
    }

    input[disabled]:checked ~ &,
    fieldset[disabled] input:checked ~ & {
      background-color: ${({ theme }) => theme.textLightColor};
    }
  }

  input:focus ~ &,
  input:active ~ & {
    border-color: ${({ theme }) => theme.linkColor};
    box-shadow: 0 0 0
      ${({ theme }) => `${em(2)} ${transparentize(0.75, theme.linkColor)}`};
  }

  input:checked ~ & {
    border-color: ${({ theme }) => theme.linkColor};
  }

  input[disabled] ~ &,
  fieldset[disabled] & {
    border-color: ${({ theme }) => theme.textLightColor};
    box-shadow: none;
  }
`

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  { className, id, value, ...props }: Props,
  ref?: React.Ref<HTMLInputElement>
) => {
  const [{ inputId, isDisabled, name }, dispatch] = useRadioContext()
  const field = useField<FieldAttributes<any>>({ name, type, value })[0]
  const seed = useUIDSeed()

  React.useEffect(
    () =>
      dispatch({ payload: { inputId: id || seed(name) }, type: 'setInputId' }),
    [dispatch, id, name, seed]
  )

  return (
    <>
      <Root
        id={inputId}
        data-radio-input
        disabled={isDisabled}
        ref={ref}
        type={type}
        {...field}
        {...props}
      />
      <Toggle className={className} data-radio-toggle />
    </>
  )
}

export default React.forwardRef(Input)
