import { Omit } from '@fintruth-sdk/common'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseLabel, { Props as LabelProps } from 'components/label'
import { useTextFieldContext } from '.'

type Props = Omit<LabelProps, 'isRequired'>

const Root = styled(BaseLabel)`
  font-size: inherit;

  &:not(:last-child) {
    margin-bottom: ${rem(8)};
  }
`

const Label: React.RefForwardingComponent<HTMLLabelElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLLabelElement>
) => {
  const { isRequired } = useTextFieldContext()

  return <Root isRequired={isRequired} ref={ref} {...props} />
}

export default React.forwardRef(Label)
