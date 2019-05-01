import React from 'react'
import { Formik } from 'formik'
import { ThemeProvider } from 'styled-components'
import { fireEvent, render } from 'react-testing-library'

import { createTheme } from 'utilities/style'
import BaseFile from '.'

test('should render the provided label correctly', () => {
  const { getByLabelText } = render(
    <ThemeProvider theme={createTheme()}>
      <BaseFile
        id="c32b07ef-9c08-487d-9b2e-6f475496e050"
        data-testid="file"
        label="label"
        name="file"
      />
    </ThemeProvider>
  )

  expect(getByLabelText('label')).toHaveAttribute('data-testid', 'file')
})

test('should render the uploaded file name correctly after a file is uploaded', () => {
  const { getByLabelText, getByText, queryByText } = render(
    <ThemeProvider theme={createTheme()}>
      <Formik initialValues={{ file: '' }} onSubmit={() => {}}>
        <BaseFile
          id="cc166607-b4cf-4a53-b9f8-75b828535f6b"
          label="label"
          name="file"
        />
      </Formik>
    </ThemeProvider>
  )
  const input = getByLabelText('label')

  Object.defineProperty(input, 'files', {
    value: [new File(['logo'], 'logo.png', { type: 'image/png' })],
  })

  expect(queryByText('logo.png')).not.toBeInTheDocument()

  fireEvent.change(input)

  expect(getByText('logo.png')).toBeInTheDocument()
})
