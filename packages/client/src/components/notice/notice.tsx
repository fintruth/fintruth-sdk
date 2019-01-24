import styled, { css } from 'styled-components'
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
  font-size: ${rem(12)};
  font-weight: 500;

  ${({ status = 'default' }: Props) => css`
    color: ${statusColors[status]};
  `}
`

export default Notice
