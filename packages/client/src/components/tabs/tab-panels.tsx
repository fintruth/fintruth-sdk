import { TabPanels as BaseTabPanels, TabPanelsProps } from '@reach/tabs'
import React from 'react'

type Props = TabPanelsProps

const TabPanels = React.forwardRef<HTMLDivElement, Props>(function TabPanels(
  props: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  return <BaseTabPanels data-tabs-tab-panels="" ref={ref} {...props} />
})

export default TabPanels
