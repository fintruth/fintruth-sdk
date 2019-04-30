import React from 'react'
import centered from '@storybook/addon-centered/react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import {
  Submenu,
  SubmenuButton,
  SubmenuDivider,
  SubmenuItem,
  SubmenuLink,
  SubmenuList,
} from '.'

storiesOf('Components|Submenu', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Submenu>
      <SubmenuButton
        onClick={action('On Click')}
        onKeyDown={action('On Key Down')}
      >
        {text('Content', 'Submenu Button')}
      </SubmenuButton>
      <SubmenuList>
        <SubmenuLink onClick={action('On Click')} to="/">
          Submenu Link
        </SubmenuLink>
        <SubmenuDivider />
        <SubmenuItem
          onClick={action('On Click')}
          onKeyDown={action('On Key Down')}
          onMouseMove={action('On Mouse Move')}
          onSelect={action('On Select')}
        >
          Submenu Item
        </SubmenuItem>
      </SubmenuList>
    </Submenu>
  ))
