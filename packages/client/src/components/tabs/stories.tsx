import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { centeredVertically } from 'utils/story'
import Tabs, { Tab, TabList, TabPanel, TabPanels } from '.'

storiesOf('Components|Tabs', module)
  .addDecorator(centeredVertically)
  .add('Default', () => (
    <Tabs onChange={action('onChange')} readOnly={boolean('readOnly', false)}>
      <TabList>
        <Tab isDisabled={boolean('isDisabled', false, 'Tab A')}>Tab A</Tab>
        <Tab isDisabled={boolean('isDisabled', false, 'Tab B')}>Tab B</Tab>
        <Tab isDisabled={boolean('isDisabled', false, 'Tab C')}>Tab C</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel A</TabPanel>
        <TabPanel>Tab Panel B</TabPanel>
        <TabPanel>Tab Panel C</TabPanel>
      </TabPanels>
    </Tabs>
  ))
