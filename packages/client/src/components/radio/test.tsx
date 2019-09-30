import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formik } from 'formik'
import React from 'react'

import { renderWithContext } from 'utils/specification'
import Radio, { RadioInput, RadioLabel } from '.'

test('should only allow one radio button to be checked at a time', async () => {
  const { getByLabelText } = renderWithContext(
    <Formik initialValues={{ radioGroup: 'radio-a' }} onSubmit={() => {}}>
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
  const radioA = getByLabelText('Radio A') as HTMLInputElement
  const radioB = getByLabelText('Radio B') as HTMLInputElement

  expect(radioA.checked).toBe(true)
  expect(radioB.checked).toBe(false)

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore 2345
  // eslint-disable-next-line @typescript-eslint/require-await
  await act(async () => {
    userEvent.click(radioB)
  })

  expect(radioA.checked).toBe(false)
  expect(radioB.checked).toBe(true)
})
