import { rem } from 'polished'
import styled from 'styled-components'

import { cell } from './mixins'

const Td = styled.td`
  ${cell}
  color: ${({ theme }) => theme.gray};
  padding-top: ${rem(30)};
`

export default Td
