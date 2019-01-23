import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import BaseNotice from 'components/notice'
import Input from 'components/input'
import Label from 'components/label'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  isRequired?: boolean
  label?: string
  notice?: string
  status?: string
}

const Root = styled.div`
  & + & {
    margin-top: ${rem(20)};
  }
`

const Notice = styled(BaseNotice)`
  margin-top: ${rem(6)};
`

const InputField: React.FunctionComponent<Props> = ({
  className,
  id,
  isRequired = true,
  label,
  notice,
  status = 'default',
  ...rest
}: Props) => (
  <Root className={className}>
    {label && (
      <Label htmlFor={id} isRequired={isRequired}>
        {label}
      </Label>
    )}
    <Input id={id} status={status} {...rest} />
    {notice && <Notice status="failure">{notice}</Notice>}
  </Root>
)

export default InputField
