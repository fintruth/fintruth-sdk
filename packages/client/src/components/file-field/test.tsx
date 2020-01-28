import { act, fireEvent, screen } from '@testing-library/react'
import { Formik } from 'formik'
import React from 'react'

import { renderWithContext } from 'utils/spec'
import FileField, {
  FileFieldCallToAction,
  FileFieldLabel,
  FileFieldName,
} from '.'

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

test('should render the uploaded file name correctly after a file is uploaded', async () => {
  renderWithContext(
    <Formik initialValues={{ file: 'logo.jpg' }} onSubmit={noop}>
      <FileField name="file">
        <FileFieldCallToAction>
          <FileFieldLabel>label</FileFieldLabel>
        </FileFieldCallToAction>
        <FileFieldName />
      </FileField>
    </Formik>
  )
  const input = screen.getByLabelText('label')

  Object.defineProperty(input, 'files', {
    value: [new File(['logo'], 'logo.png', { type: 'image/png' })],
  })

  expect(screen.queryByText('logo.jpg')).not.toBeInTheDocument()

  // eslint-disable-next-line @typescript-eslint/require-await
  await act(async () => {
    fireEvent.change(input)
  })

  expect(screen.getByText('logo.png')).toBeInTheDocument()
})
