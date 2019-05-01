import React from 'react'
import styled, { css } from 'styled-components'
import { darken, em } from 'polished'

import BaseFileUpload from 'assets/file-upload.svg'
import { control } from 'styles/mixins'

interface Props
  extends Exclude<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string
  label?: string
  value?: string
}

const Root = styled.div`
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  user-select: none;
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
  border-color: ${({ theme }) => theme.file.borderColor};
  border-radius: ${({ theme }) => theme.file.radius};
  font-size: ${em(16)};
  padding-left: ${em(16)};
  padding-right: ${em(16)};
  white-space: nowrap;
`

const CallToAction = styled.span`
  ${shared};
  background-color: ${({ theme }) => theme.file.ctaBackgroundColor};
  color: ${({ theme }) => theme.file.ctaColor};

  &:not(:only-child) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  &:hover {
    background-color: ${({ theme }) =>
      darken(0.025, theme.file.ctaBackgroundColor)};
    color: ${({ theme }) => theme.file.ctaHoverColor};
  }

  &:active {
    background-color: ${({ theme }) =>
      darken(0.05, theme.file.ctaBackgroundColor)};
    color: ${({ theme }) => theme.file.ctaActiveColor};
  }
`

const Name = styled.span`
  ${shared};
  border-bottom-left-radius: 0;
  border-color: ${({ theme }) => theme.file.nameBorderColor};
  border-style: ${({ theme }) => theme.file.nameBorderStyle};
  border-top-left-radius: 0;
  border-width: ${({ theme }) => theme.file.nameBorderWidth};
  display: block;
  flex-grow: 1;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
`

const File: React.FunctionComponent<Props> = ({
  accept = 'image/jpeg, image/png',
  className,
  id,
  label = 'Choose File',
  value,
  ...rest
}: Props) => (
  <Root className={className}>
    <CallToAction>
      <Input id={id} accept={accept} {...rest} type="file" />
      <FileUpload />
      <Label htmlFor={id}>{label}</Label>
    </CallToAction>
    {value && <Name>{value}</Name>}
  </Root>
)

export default File
