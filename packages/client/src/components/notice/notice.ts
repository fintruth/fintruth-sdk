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

const Notice = styled.div`
  color: ${({ status = 'default' }: Props) =>
    statusColors[status] || statusColors['default']};
  font-size: ${rem(12)};
  font-weight: 500;
`

export default Notice
