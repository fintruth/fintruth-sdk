import { MixedSchema, mixed } from '@fintruth-sdk/validation'
import {
  FieldAttributes,
  FieldValidator,
  useField,
  useFormikContext,
} from 'formik'
import { getType } from 'mime/lite'
import { darken, em } from 'polished'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Variant, css } from 'styled-components'

import { useTimer } from 'hooks/time'
import { center, control, loader, unselectable } from 'styles/mixins'
import { variantColorContrasts, variantColors } from 'styles/theme'
import { setRef } from 'utils/react'
import { useFileFieldContext } from '.'

interface Context {
  isRequired: boolean
  maxSize: number
}

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'required' | 'type'
  > {
  delay?: number
  isLoading?: boolean
  maxSize?: number
  validate?: FieldValidator
  variant?: Variant
}

interface RootProps {
  isLoading?: boolean
  disabled: boolean
  variant?: Variant
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
          message: 'The file size is too large',
          test: (value?: File | string | null) =>
            value == null || !(value instanceof File) || value.size <= maxSize,
        })
      }
    )
    .validate(value, { context })
    .then(() => '')
    .catch((error) => error.message)

const loading = (color?: string) => css`
  box-shadow: none !important;
  color: transparent !important;
  pointer-events: none;

  &::after {
    ${loader(color)}
    ${center(em(16))}
    position: absolute !important;
  }
`

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
  ${control}
  ${unselectable}
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${em(16)};
  padding-left: ${em(16)};
  padding-right: ${em(16)};
  white-space: nowrap;

  ${({ theme, variant }) =>
    variant
      ? variation(
          theme[variantColors[variant]],
          theme[variantColorContrasts[variant]]
        )
      : standard}

  ${({ isLoading, theme, variant }) =>
    isLoading &&
    loading(
      variant ? theme[variantColorContrasts[variant]] : theme.borderColor
    )}
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

const CallToAction = React.forwardRef<HTMLInputElement, Props>(
  function CallToAction(
    {
      children,
      className,
      delay,
      id,
      isLoading = false,
      maxSize = 2 * 10 ** 6,
      onChange,
      validate,
      variant,
      ...props
    }: Props,
    ref?: React.Ref<HTMLInputElement>
  ) {
    const [
      { controlId, fileName, hasCropper, isDisabled, isRequired, name },
      dispatch,
    ] = useFileFieldContext()
    const { onBlur, value } = useField<FieldAttributes<any>>({
      name,
      type: 'file',
      validate:
        validate ||
        ((value: File | string) =>
          validateInput(value, { isRequired, maxSize })),
    })[0]
    const { setFieldValue } = useFormikContext<any>()
    const input = React.useRef<HTMLInputElement>()
    const isLoaderVisible = useTimer(isLoading, delay)
    const seed = useUIDSeed()

    React.useEffect(
      () =>
        dispatch({
          payload: { controlId: id || seed(name) },
          type: 'setControlId',
        }),
      [dispatch, id, name, seed]
    )

    React.useEffect(() => {
      if (!value && input.current) {
        input.current.value = ''
      }
    }, [value])

    return (
      <Root
        className={className}
        data-file-field-call-to-action=""
        disabled={isDisabled}
        isLoading={isLoaderVisible}
        role="group"
        variant={variant}
      >
        <Input
          id={controlId}
          data-file-field-input=""
          disabled={isDisabled}
          name={name}
          onBlur={onBlur}
          onChange={(event) => {
            if (onChange) {
              onChange(event)
            }

            const { files } = event.target
            const type = getType(fileName) || 'image/jpeg'
            const file = fileName
              ? new File([(files && files[0]) || ''], fileName, { type })
              : (files && files[0]) || ''

            setFieldValue(name, file)

            if (hasCropper) {
              if (typeof file === 'string') {
                return dispatch({ payload: { src: undefined }, type: 'setSrc' })
              }

              const reader = new FileReader()

              reader.addEventListener('load', () => {
                const src = (reader.result as string) || undefined

                return dispatch({ payload: { src }, type: 'setSrc' })
              })

              return reader.readAsDataURL(file)
            }
          }}
          ref={(instance) => {
            if (ref) {
              setRef(ref, instance)
            }

            return setRef(input, instance)
          }}
          required={isRequired}
          type="file"
          {...props}
        />
        {children}
      </Root>
    )
  }
)

export default CallToAction
