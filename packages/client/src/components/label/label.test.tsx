import React from 'react'
import { render } from 'react-testing-library'
import Label from '.'

test('should not append the required symbol to the provided children', () => {
  const { getByText } = render(<Label data-testid="label">child</Label>)

  expect(getByText('child')).toHaveAttribute('data-testid', 'label')
})

test('should append the required symbol to the provided children', () => {
  const { getByText } = render(
    <Label data-testid="label" isRequired>
      child
    </Label>
  )

  expect(getByText('child*')).toHaveAttribute('data-testid', 'label')
})
