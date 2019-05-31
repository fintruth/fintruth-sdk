import { render } from '@testing-library/react'
import { Formik } from 'formik'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import Input from '.'

test('should render the provided label correctly', () => {
  const { getByLabelText } = render(
    <ThemeProvider theme={theme}>
      <Formik initialValues={{ input: '' }} onSubmit={() => {}}>
        <Input
          id="41d1dd52-2e68-487a-bf61-b464c49a67f1"
          data-testid="input"
          isRequired={false}
          label="label"
          name="input"
        />
      </Formik>
    </ThemeProvider>
  )

  expect(getByLabelText('label')).toHaveAttribute('data-testid', 'input')
})
