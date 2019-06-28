import { mixed, MixedSchema } from '@fintruth-sdk/validation'
import { useField, useFormikContext, Validate } from 'formik'
import { darken, em } from 'polished'
import React from 'react'
import styled, { Color, ColorContrast, css } from 'styled-components' // eslint-disable-line import/named

import { control, unselectable } from 'styles/mixins'
import { setRef } from 'utilities/react'
import { useFileFieldContext, Variant } from '.'

interface Context {
  isRequired: boolean
  maxSize: number
}

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'required' | 'type'
  > {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  maxSize?: number
  validate?: Validate
  variant?: Variant
}

interface RootProps {
  disabled: boolean
  variant?: Variant
}

const colors: Record<Variant, Color> = {
  danger: 'danger',
  primary: 'primary',
}

const colorContrasts: Record<Variant, ColorContrast> = {
  danger: 'dangerContrast',
  primary: 'primaryContrast',
}

const disabledOpacity = 0.5

const validateInput = (value: File | string, context: Context) =>
  mixed()
    .when(
      ['$isRequired', '$maxSize'],
      (isRequired: boolean, maxSize: number, schema: MixedSchema) => {
        if (isRequired) {
          // eslint-disable-next-line no-param-reassign
          schema = schema.test({
            name: 'required',
            exclusive: true,
            message: 'This is a required field',
            test: (value?: File | string | null) => value instanceof File,
          })
        }

        return schema.test({
          name: 'maxSize',
          exclusive: true,
          message: 'File size is too large',
          test: (value?: File | string | null) =>
            value == null || !(value instanceof File) || value.size <= maxSize,
        })
      }
    )
    .validate(value, { context })
    .then(() => '')
    .catch(error => error.message)

const standard = css`
  background-color: ${({ theme }) => theme.whiteTer};
  border-color: ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.grayDark};

  &:hover {
    background-color: ${({ theme }) => darken(0.025, theme.whiteTer)};
    color: ${({ theme }) => theme.grayDarker};
  }

  &:active {
    background-color: ${({ theme }) => darken(0.05, theme.whiteTer)};
    color: ${({ theme }) => theme.grayDarker};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${({ theme }) => theme.whiteTer};
    color: ${({ theme }) => theme.grayDarker};
    opacity: ${disabledOpacity};
  }
`

const variation = (color: string, colorContrast: string) => css`
  background-color: ${color};
  border-color: transparent;
  color: ${colorContrast};

  &:hover {
    background-color: ${darken(0.025, color)};
  }

  &:active {
    background-color: ${darken(0.05, color)};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${color};
    opacity: ${disabledOpacity};
  }
`

const Root = styled.span<RootProps>`
  ${control};
  ${unselectable};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${em(16)};
  padding-left: ${em(16)};
  padding-right: ${em(16)};
  white-space: nowrap;

  ${({ theme, variant }) =>
    variant
      ? variation(theme[colors[variant]], theme[colorContrasts[variant]])
      : standard};
`

const Input = styled.input`
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  outline: none;
  position: absolute;
  top: 0;
  width: 100%;

  &::-webkit-file-upload-button {
    cursor: pointer;
  }

  &[disabled],
  fieldset[disabled] & {
    cursor: not-allowed;

    &::-webkit-file-upload-button {
      cursor: not-allowed;
    }
  }
`

const CallToAction: React.RefForwardingComponent<HTMLInputElement, Props> = (
  {
    children,
    className,
    maxSize = 2 * 10 ** 6,
    validate,
    variant,
    ...props
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const { isDisabled, isRequired, labelId, name } = useFileFieldContext()[0]
  const { onBlur, value } = useField<File | string>(name)[0]
  const { registerField, setFieldValue, unregisterField } = useFormikContext()
  const input = React.useRef<HTMLInputElement>()

  const defaultValidate = React.useCallback<Validate>(
    (value: File | string) => validateInput(value, { isRequired, maxSize }),
    [isRequired, maxSize]
  )

  React.useEffect(() => {
    registerField(name, { validate: validate || defaultValidate })

    return () => unregisterField(name)
  }, [defaultValidate, name, registerField, unregisterField, validate])

  React.useEffect(() => {
    if (!value && input !== null && input.current) {
      input.current.value = ''
    }
  }, [value])

  return (
    <Root
      className={className}
      data-file-field-call-to-action
      disabled={isDisabled}
      role="group"
      variant={variant}
    >
      <Input
        aria-labelledby={labelId}
        disabled={isDisabled}
        name={name}
        onBlur={onBlur}
        onChange={event => {
          const file =
            event.target.files !== null && event.target.files.length >= 1
              ? event.target.files[0]
              : undefined

          return file && setFieldValue(name as never, file)
        }}
        ref={instance => {
          setRef(ref, instance)
          setRef(input, instance)
        }}
        required={isRequired}
        type="file"
        {...props}
      />
      {children}
    </Root>
  )
}

export default React.forwardRef(CallToAction)
