import styled from 'styled-components'
import { rem } from 'polished'

import { aquaMarine, raven, watermelon } from 'styles/variables'

type Status = 'default' | 'failure' | 'success'

interface Props {
  status?: Status
}

const statusColors: Record<Status, string> = {
  default: raven,
  failure: watermelon,
  success: aquaMarine,
}

const Notice = styled.div`
  color: ${({ status = 'default' }: Props) => statusColors[status]};
  font-size: ${rem(12)};
  font-weight: 500;
`

export default Notice
