import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from 'react-testing-library'

import { createTheme } from 'utilities/style'
import InputField from '.'

test('should render the provided label correctly', () => {
  const { getByLabelText } = render(
    <ThemeProvider theme={createTheme()}>
      <InputField
        id="41d1dd52-2e68-487a-bf61-b464c49a67f1"
        data-testid="input-field"
        isRequired={false}
        label="label"
      />
    </ThemeProvider>
  )

  expect(getByLabelText('label')).toHaveAttribute('data-testid', 'input-field')
})

test('should render the provided notice correctly', () => {
  const { getByText } = render(
    <ThemeProvider theme={createTheme()}>
      <InputField id="ac3cecd6-d704-4b2e-b3ef-bf8a54bd65d9" notice="notice" />
    </ThemeProvider>
  )

  expect(getByText('notice')).toBeInTheDocument()
})
