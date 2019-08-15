import { rem } from 'polished'
import styled from 'styled-components'

import { cell } from './mixins'

const Th = styled.th`
  ${cell}
  color: ${({ theme }) => theme.grayLight};
  font-size: ${rem(12)};
  font-weight: 700;
  padding: ${rem(18)} 0 ${rem(19)};
`

export default Th
