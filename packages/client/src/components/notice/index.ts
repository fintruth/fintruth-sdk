import styled from 'styled-components'
import { rem } from 'polished'

import { aquaMarine, raven, watermelon } from 'styles/variables'

interface Props {
  status?: string
}

interface StatusColors {
  [key: string]: string
  default: string
  failure: string
  success: string
}

const statusColors: StatusColors = {
  default: raven,
  failure: watermelon,
  success: aquaMarine,
}

const statusToColor = (status: string) =>
  statusColors[status] || statusColors['default']

const Notice = styled.div`
  color: ${({ status = 'default' }: Props) => statusToColor(status)};
  font-size: ${rem(12)};
  font-weight: 500;
`

export default Notice
