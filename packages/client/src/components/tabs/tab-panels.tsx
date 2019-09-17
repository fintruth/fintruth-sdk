import { TabPanels as BaseTabPanels, TabPanelsProps } from '@reach/tabs'
import React from 'react'

type Props = TabPanelsProps

const TabPanels: React.RefForwardingComponent<HTMLDivElement, Props> = (
  props: Props,
  ref?: React.Ref<HTMLDivElement>
) => <BaseTabPanels data-tabs-tab-panels="" ref={ref} {...props} />

export default React.forwardRef(TabPanels)
