import { Omit } from '@fintruth-sdk/shared'
import { useFormikContext } from 'formik'
import { darken, em } from 'polished'
import { path } from 'ramda'
import React from 'react'
import styled, { css } from 'styled-components'

import BaseFileUpload from 'assets/file-upload.svg'
import { control, unselectable } from 'styles/mixins'

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  id: string
  label?: string
  name: string
}

const Root = styled.div`
  ${unselectable};
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
`

const Input = styled.input`
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;

  &::-webkit-file-upload-button {
    cursor: pointer;
  }
`

const FileUpload = styled(BaseFileUpload)`
  fill: currentColor;
  height: ${em(16)};
  margin-right: ${em(8)};
  min-width: ${em(12)};
`

const Label = styled.label`
  width: 100%;
`

const shared = css`
  ${control};
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${em(16)};
  padding-left: ${em(16)};
  padding-right: ${em(16)};
  white-space: nowrap;
`

const CallToAction = styled.span`
  ${shared};
  background-color: ${({ theme }) => theme.whiteTer};
  color: ${({ theme }) => theme.grayDark};

  &:not(:only-child) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  &:hover {
    background-color: ${({ theme }) => darken(0.025, theme.whiteTer)};
    color: ${({ theme }) => theme.grayDarker};
  }

  &:active {
    background-color: ${({ theme }) => darken(0.05, theme.whiteTer)};
    color: ${({ theme }) => theme.grayDarker};
  }
`

const Name = styled.span`
  ${shared};
  border-bottom-left-radius: 0;
  border-color: ${({ theme }) => theme.borderColor};
  border-style: solid;
  border-top-left-radius: 0;
  border-width: 1px 1px 1px 0;
  display: block;
  flex-grow: 1;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
`

const File: React.FunctionComponent<Props> = ({
  className,
  id,
  label = 'Choose File',
  name,
  ...props
}: Props) => {
  const [value, setValue] = React.useState<File | null>(null)
  const { setFieldValue } = useFormikContext()

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = path<File>(['files', 0], target)

    setFieldValue(name as never, file || '')

    return file ? setValue(file) : undefined
  }

  return (
    <Root className={className}>
      <CallToAction>
        <Input
          id={id}
          name={name}
          onChange={handleChange}
          {...props}
          type="file"
        />
        <FileUpload />
        <Label htmlFor={id}>{label}</Label>
      </CallToAction>
      {value && <Name>{value.name}</Name>}
    </Root>
  )
}

export default File
