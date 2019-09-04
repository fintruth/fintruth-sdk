import { useField } from 'formik'
import { em, rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { control } from 'styles/mixins'
import { useFileFieldContext } from '.'

type Props = React.HTMLAttributes<HTMLSpanElement>

interface RootProps {
  disabled: boolean
}

const Root = styled.span<RootProps>`
  ${control};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: block;
  flex-grow: 1;
  font-size: ${em(16)};
  overflow: hidden;
  padding-left: ${em(16)};
  padding-right: ${em(16)};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:not(:first-child) {
    margin-top: ${rem(12)};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textLightColor};
  }
`

const Name: React.RefForwardingComponent<HTMLSpanElement, Props> = (
  props: Props,
  ref?: React.Ref<HTMLSpanElement>
) => {
  const { isDisabled, name } = useFileFieldContext()[0]
  const { value } = useField<File | string>(name)[0]

  return value instanceof File ? (
    <Root data-file-field-name disabled={isDisabled} ref={ref} {...props}>
      {value.name}
    </Root>
  ) : null
}

export default React.forwardRef(Name)
