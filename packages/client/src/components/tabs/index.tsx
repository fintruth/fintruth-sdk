import { Tabs as BaseTabs, TabsProps } from '@reach/tabs'
import styles from '@reach/tabs/styles.css'
import useStyles from 'isomorphic-style-loader/useStyles'
import React from 'react'
import styled from 'styled-components'

type Props = TabsProps

const Root = styled(BaseTabs)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Tabs = React.forwardRef<HTMLDivElement, Props>(function Tabs(
  props: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  useStyles(styles)

  return <Root data-tabs="" ref={ref} {...props} />
})

export { default as Tab } from './tab'
export { default as TabList } from './tab-list'
export { default as TabPanel } from './tab-panel'
export { default as TabPanels } from './tab-panels'
export default Tabs
