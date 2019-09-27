import { fireEvent } from '@testing-library/react'
import { Formik } from 'formik'
import React from 'react'

import { renderWithContext } from 'utils/specification'
import FileField, {
  FileFieldCallToAction,
  FileFieldLabel,
  FileFieldName,
} from '.'

test('should render the uploaded file name correctly after a file is uploaded', () => {
  const { getByLabelText, getByText, queryByText } = renderWithContext(
    <Formik initialValues={{ file: 'logo.jpg' }} onSubmit={() => {}}>
      <FileField name="file">
        <FileFieldCallToAction>
          <FileFieldLabel>label</FileFieldLabel>
        </FileFieldCallToAction>
        <FileFieldName />
      </FileField>
    </Formik>
  )
  const input = getByLabelText('label')

  Object.defineProperty(input, 'files', {
    value: [new File(['logo'], 'logo.png', { type: 'image/png' })],
  })

  expect(queryByText('logo.jpg')).not.toBeInTheDocument()

  fireEvent.change(input)

  expect(getByText('logo.png')).toBeInTheDocument()
})
