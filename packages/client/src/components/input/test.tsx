import React from 'react'
import { Formik } from 'formik'
import { ThemeProvider } from 'styled-components'
import { render } from 'react-testing-library'

import { createTheme } from 'utilities/style'
import Input from '.'

test('should render the provided label correctly', () => {
  const { getByLabelText } = render(
    <ThemeProvider theme={createTheme()}>
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
