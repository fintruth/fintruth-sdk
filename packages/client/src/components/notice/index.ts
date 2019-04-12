import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { rem } from 'polished'

interface Props {
  variant?: NoticeVariant
}

const Notice = styled.p<Props>`
  color: ${({ theme, variant = 'default' }) => theme.notice[variant]};
  display: block;
  font-size: ${({ theme }) => theme.notice.fontSize};
  margin-top: ${rem(4)};
`

export default Notice
