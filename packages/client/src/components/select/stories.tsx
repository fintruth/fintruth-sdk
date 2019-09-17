import { boolean, number, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { option } from 'styles/mixins'
import { centered } from 'utils/story'
import Select, { Variant } from '.'

const variants: Record<string, Variant | ''> = {
  default: '',
  danger: 'danger',
}

const Option = styled.option`
  ${option};
`

storiesOf('Components|Select', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Select
      delay={number('delay', 200)}
      isDisabled={boolean('isDisabled', false)}
      isLoading={boolean('isLoading', false)}
      isMultiple={boolean('isMultiple', false)}
      variant={select<Variant | ''>('variant', variants, '') || undefined}
    >
      <Option value="optionA">Option A</Option>
      <Option value="optionB">Option B</Option>
      <Option value="optionC">Option C</Option>
      <Option value="optionD">Option D</Option>
    </Select>
  ))
