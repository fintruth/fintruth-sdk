import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formik } from 'formik'
import React from 'react'

import { renderWithContext } from 'utils/spec'
import Radio, { RadioInput, RadioLabel } from '.'

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

test('should only allow one radio button to be checked at a time', async () => {
  renderWithContext(
    <Formik initialValues={{ radioGroup: 'radio-a' }} onSubmit={noop}>
      <>
        <Radio name="radioGroup">
          <RadioInput value="radio-a" />
          <RadioLabel>Radio A</RadioLabel>
        </Radio>
        <Radio name="radioGroup">
          <RadioInput value="radio-b" />
          <RadioLabel>Radio B</RadioLabel>
        </Radio>
      </>
    </Formik>
  )
  const radioA = screen.getByLabelText('Radio A') as HTMLInputElement
  const radioB = screen.getByLabelText('Radio B') as HTMLInputElement

  expect(radioA.checked).toBe(true)
  expect(radioB.checked).toBe(false)

  // eslint-disable-next-line @typescript-eslint/require-await
  await act(async () => {
    userEvent.click(radioB)
  })

  expect(radioA.checked).toBe(false)
  expect(radioB.checked).toBe(true)
})
