import { em } from 'polished'
import styled from 'styled-components'

import BaseIcon from './icon.svg'

type Props = React.SVGAttributes<SVGSVGElement>

const Icon = styled(BaseIcon).attrs((attrs) => ({
  'data-file-field-icon': '',
  ...attrs,
}))<Props>`
  fill: currentColor;
  height: ${em(16)};
  margin-right: ${em(8)};
  min-width: ${em(12)};
`

export default Icon
