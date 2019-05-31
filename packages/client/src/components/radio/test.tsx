import { render } from '@testing-library/react'
import { Formik } from 'formik'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import userEvent from 'user-event'

import theme from 'styles/theme'
import Radio from '.'

test('should render the provided label correctly', () => {
  const { getByLabelText } = render(
    <ThemeProvider theme={theme}>
      <Formik initialValues={{ radio: 'radio' }} onSubmit={() => {}}>
        <Radio
          id="d3e57c46-66a7-4e4a-9d15-3e6f4e57ff83"
          data-testid="radio"
          label="label"
          name="radio"
          value="radio"
        />
      </Formik>
    </ThemeProvider>
  )

  expect(getByLabelText('label')).toHaveAttribute('data-testid', 'radio')
})

test('should only allow one radio button to be checked at a time', () => {
  const { getByLabelText } = render(
    <ThemeProvider theme={theme}>
      <Formik initialValues={{ radioGroup: 'radio-a' }} onSubmit={() => {}}>
        <React.Fragment>
          <Radio
            id="fce32d61-a4cf-4ae5-86de-82600ea8ddfb"
            label="Radio A"
            name="radioGroup"
            value="radio-a"
          />
          <Radio
            id="ac5b408f-c7a8-4bd0-a812-078f83ef947f"
            label="Radio B"
            name="radioGroup"
            value="radio-b"
          />
        </React.Fragment>
      </Formik>
    </ThemeProvider>
  )
  const radioA = getByLabelText('Radio A') as HTMLInputElement
  const radioB = getByLabelText('Radio B') as HTMLInputElement

  expect(radioA.checked).toBe(true)
  expect(radioB.checked).toBe(false)

  userEvent.click(radioB)

  expect(radioA.checked).toBe(false)
  expect(radioB.checked).toBe(true)
})
