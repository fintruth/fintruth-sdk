import { TabList as BaseTabList, TabListProps } from '@reach/tabs'
import { rem } from 'polished'
import styled from 'styled-components'

import { unselectable } from 'styles/mixins'

type Props = TabListProps

const TabList = styled(BaseTabList).attrs((attrs) => ({
  'data-tabs-tab-list': '',
  ...attrs,
}))<Props>`
  ${unselectable};
  -webkit-overflow-scrolling: touch;
  align-items: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  font-size: ${rem(16)};
  white-space: nowrap;

  &[data-tabs-tab-list] {
    display: flex;
    background: unset;
  }

  &:not(:last-child) {
    margin-bottom: ${rem(24)};
  }
`

export default TabList
