import { em } from 'polished'
import React from 'react'
import styled from 'styled-components'

import BaseIcon from './icon.svg'

interface Props extends React.SVGAttributes<SVGSVGElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
}

const Root = styled(BaseIcon)`
  fill: currentColor;
  height: ${em(16)};
  margin-right: ${em(8)};
  min-width: ${em(12)};
`

const Icon: React.RefForwardingComponent<SVGSVGElement, Props> = (
  props: Props,
  ref: React.Ref<SVGSVGElement>
) => <Root data-file-field-icon ref={ref} {...props} />

export default React.forwardRef(Icon)
