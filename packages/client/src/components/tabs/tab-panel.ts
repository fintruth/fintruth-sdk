import { TabPanel as BaseTabPanel, TabPanelProps } from '@reach/tabs'
import styled from 'styled-components'

type Props = TabPanelProps

const TabPanel = styled(BaseTabPanel).attrs((attrs) => ({
  'data-tabs-tab-panel': '',
  ...attrs,
}))<Props>`
  &[data-tabs-tab-panel] {
    outline: none;
  }
`

export default TabPanel
