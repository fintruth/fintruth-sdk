import { MockedProvider } from '@apollo/react-testing'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import { createFragmentMatcher, createInMemoryCache } from 'utilities/apollo'
import { countriesQuery } from './graphql'
import PhoneField, {
  PhoneFieldHelp,
  PhoneFieldInput,
  PhoneFieldLabel,
  PhoneFieldSelect,
  PhoneValue,
} from '.'

interface Values {
  phone: PhoneValue
}

const countries = [
  {
    id: 'd5554a44-4be6-4438-8374-0b1d244c696a',
    alpha2Code: 'AF',
    callingCode: '93',
    name: 'Afghanistan',
    placeholder: '070 123 4567',
    __typename: 'Country',
  },
  {
    id: 'da497113-b7fa-40f3-9c37-4eb740853c96',
    alpha2Code: 'BS',
    callingCode: '1',
    name: 'Bahamas',
    placeholder: '(242) 359-1234',
    __typename: 'Country',
  },
  {
    id: '846d0273-2372-47ef-9776-3669136c2093',
    alpha2Code: 'CV',
    callingCode: '238',
    name: 'Cabo Verde',
    placeholder: '991 12 34',
    __typename: 'Country',
  },
  {
    id: '5456984e-573f-4413-9a5f-4a03f105db11',
    alpha2Code: 'DK',
    callingCode: '45',
    name: 'Denmark',
    placeholder: '32 12 34 56',
    __typename: 'Country',
  },
  {
    id: 'c2052ccc-3ede-4214-840c-a829fdb53dd4',
    alpha2Code: 'EC',
    callingCode: '593',
    name: 'Ecuador',
    placeholder: '099 123 4567',
    __typename: 'Country',
  },
  {
    id: '0a1993da-3444-4c3f-a26a-77dcae042225',
    alpha2Code: 'FK',
    callingCode: '500',
    name: 'Falkland Islands',
    placeholder: '51234',
    __typename: 'Country',
  },
  {
    id: '5124681e-c2d6-4d48-bccd-03e5f1094738',
    alpha2Code: 'GA',
    callingCode: '241',
    name: 'Gabon',
    placeholder: '06 03 12 34',
    __typename: 'Country',
  },
  {
    id: '691f6871-3949-48f1-8da5-709ee233b76c',
    alpha2Code: 'HT',
    callingCode: '509',
    name: 'Haiti',
    placeholder: '34 10 1234',
    __typename: 'Country',
  },
  {
    id: '2e4a8535-ddbd-4968-90dd-451decddadac',
    alpha2Code: 'IS',
    callingCode: '354',
    name: 'Iceland',
    placeholder: '611 1234',
    __typename: 'Country',
  },
  {
    id: '44f9096b-4e10-4d8d-8260-b506954ff4ae',
    alpha2Code: 'JM',
    callingCode: '1',
    name: 'Jamaica',
    placeholder: '(876) 210-1234',
    __typename: 'Country',
  },
  {
    id: '3b1cd3e8-8ef7-4a56-ae4f-0fb48aa264fa',
    alpha2Code: 'KZ',
    callingCode: '7',
    name: 'Kazakhstan',
    placeholder: '8 (771) 000 9998',
    __typename: 'Country',
  },
  {
    id: '8d699de0-90c4-458c-b6c0-17531d5bfc8f',
    alpha2Code: 'LA',
    callingCode: '856',
    name: 'Laos',
    placeholder: '020 23 123 456',
    __typename: 'Country',
  },
  {
    id: '667bde13-1dbe-4035-9963-0f3cd55e10cb',
    alpha2Code: 'MO',
    callingCode: '853',
    name: 'Macau',
    placeholder: '6612 3456',
    __typename: 'Country',
  },
  {
    id: '9e3a0e58-7f1c-45d2-bd27-7bbe42de83a8',
    alpha2Code: 'NA',
    callingCode: '264',
    name: 'Namibia',
    placeholder: '081 123 4567',
    __typename: 'Country',
  },
  {
    id: 'f0229275-e562-45c8-b8c8-96646f645943',
    alpha2Code: 'OM',
    callingCode: '968',
    name: 'Oman',
    placeholder: '9212 3456',
    __typename: 'Country',
  },
  {
    id: 'ba8c1605-73d5-41f5-984c-f0203d7de9bd',
    alpha2Code: 'PK',
    callingCode: '92',
    name: 'Pakistan',
    placeholder: '0301 2345678',
    __typename: 'Country',
  },
  {
    id: '93962443-d30e-4220-aa83-93386424973d',
    alpha2Code: 'QA',
    callingCode: '974',
    name: 'Qatar',
    placeholder: '3312 3456',
    __typename: 'Country',
  },
  {
    id: '1aacc2a2-9259-4a05-8da2-42512db21ef6',
    alpha2Code: 'RE',
    callingCode: '262',
    name: 'Réunion',
    placeholder: '0692 12 34 56',
    __typename: 'Country',
  },
  {
    id: 'f3ee2a85-cfb4-4626-a3ea-d229b1fe5f4c',
    alpha2Code: 'BL',
    callingCode: '590',
    name: 'Saint Barthélemy',
    placeholder: '0690 00 12 34',
    __typename: 'Country',
  },
  {
    id: 'bc1c2998-e3ae-479e-a742-ae0cf28d4e59',
    alpha2Code: 'TW',
    callingCode: '886',
    name: 'Taiwan',
    placeholder: '0912 345 678',
    __typename: 'Country',
  },
  {
    id: 'abb86812-e2d5-44e4-a333-b3ca63ce8ae0',
    alpha2Code: 'UG',
    callingCode: '256',
    name: 'Uganda',
    placeholder: '0712 345678',
    __typename: 'Country',
  },
  {
    id: '9fb573ec-430d-4d04-b360-d0200536dafa',
    alpha2Code: 'VU',
    callingCode: '678',
    name: 'Vanuatu',
    placeholder: '591 2345',
    __typename: 'Country',
  },
  {
    id: 'd7e863f3-dfe2-41b9-b925-ee963c222a76',
    alpha2Code: 'WF',
    callingCode: '681',
    name: 'Wallis and Futuna',
    placeholder: '50 12 34',
    __typename: 'Country',
  },
  {
    id: '82bffec2-bccd-493d-9915-125a41eb8955',
    alpha2Code: 'YE',
    callingCode: '967',
    name: 'Yemen',
    placeholder: '0712 345 678',
    __typename: 'Country',
  },
  {
    id: '71ede525-70ea-4837-966c-73fb2c0c19a0',
    alpha2Code: 'ZM',
    callingCode: '260',
    name: 'Zambia',
    placeholder: '095 5123456',
    __typename: 'Country',
  },
]

const fragmentMatcher = createFragmentMatcher()

const initialValues: Values = { phone: { alpha2Code: 'WF', number: '' } }

const defaultMocks = [
  { request: { query: countriesQuery }, result: { data: { countries } } },
]

const delayMocks = [
  {
    delay: 5000,
    request: { query: countriesQuery },
    result: { data: { countries } },
  },
]

storiesOf('Components|Phone Field', module)
  .addDecorator(centered)
  .add('Default', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={defaultMocks}
    >
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={action('onSubmit')}
      >
        <PhoneField
          isDisabled={boolean('isDisabled', false)}
          isRequired={boolean('isRequired', true)}
          name="phone"
        >
          <PhoneFieldLabel>{text('label', 'Label')}</PhoneFieldLabel>
          <PhoneFieldSelect />
          <PhoneFieldInput />
          <PhoneFieldHelp />
        </PhoneField>
      </Formik>
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider
      cache={createInMemoryCache({ fragmentMatcher })}
      mocks={delayMocks}
    >
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={action('onSubmit')}
      >
        <PhoneField
          isDisabled={boolean('isDisabled', false)}
          isRequired={boolean('isRequired', true)}
          name="phone"
        >
          <PhoneFieldLabel>{text('label', 'Label')}</PhoneFieldLabel>
          <PhoneFieldSelect />
          <PhoneFieldInput />
          <PhoneFieldHelp />
        </PhoneField>
      </Formik>
    </MockedProvider>
  ))
