import { rem } from 'polished'
import styled from 'styled-components'

const Thead = styled.thead`
  border-bottom: ${rem(1)} solid ${({ theme }) => theme.whiteTer};
  border-top: ${rem(1)} solid ${({ theme }) => theme.whiteTer};
`

export default Thead
