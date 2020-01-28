import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithContext } from 'utils/spec'
import Label from '.'

test('should not append the required symbol to the provided children', () => {
  renderWithContext(<Label data-testid="label">child</Label>)

  expect(screen.getByText('child')).toHaveAttribute('data-testid', 'label')
})

test('should append the required symbol to the provided children', () => {
  renderWithContext(
    <Label data-testid="label" isRequired>
      child
    </Label>
  )

  expect(screen.getByText('child*')).toHaveAttribute('data-testid', 'label')
})
