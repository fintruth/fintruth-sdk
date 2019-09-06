import centered from '@storybook/addon-centered/react'
import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Tooltip, { Variant } from '.'

const variants: Record<string, Variant | ''> = {
  default: '',
  primary: 'primary',
  danger: 'danger',
}

storiesOf('Components|Tooltip', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Tooltip
      ariaLabel={text('ariaLabel', 'The label announced by screenreaders')}
      label={text(
        'label',
        'Tooltips with a lot of text are designed to warp into a multiline display.'
      )}
      variant={select<Variant | ''>('variant', variants, '') || undefined}
    >
      <div>{text('children', 'Tooltip')}</div>
    </Tooltip>
  ))
