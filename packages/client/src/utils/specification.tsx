import {
  Email,
  EnableTwoFactorAuthResponse,
  Profile,
  Response,
  ResponseError,
  SignInResponse,
  User,
} from '@fintruth-sdk/common'
import {
  History,
  LocationProvider,
  LocationProviderRenderFn,
  createHistory,
  createMemorySource,
} from '@reach/router'
import { render } from '@testing-library/react'
import React from 'react'
import { IntlConfig, IntlProvider } from 'react-intl'
import { DefaultTheme, ThemeProvider } from 'styled-components' // eslint-disable-line import/named
import { arrayOf, bool, build, fake } from 'test-data-bot'

import defaultTheme from 'styles/theme'

type AnyIfEmpty<T extends {}> = keyof T extends never ? any : T

type Theme =
  | AnyIfEmpty<DefaultTheme>
  | ((theme: AnyIfEmpty<DefaultTheme>) => AnyIfEmpty<DefaultTheme>)

interface Options extends Partial<IntlConfig> {
  history?: History
  initialPath?: string
  theme?: Theme
}

interface TypeName {
  __typename: string
}

export const renderWithContext = (
  node: React.ReactNode | LocationProviderRenderFn,
  {
    defaultFormats,
    defaultLocale = 'en',
    formats,
    history: providedHistory,
    initialPath = '/',
    locale = 'en',
    messages,
    onError,
    textComponent,
    theme = defaultTheme,
    timeZone,
  }: Options = {}
) => {
  const history =
    providedHistory || createHistory(createMemorySource(initialPath))

  return {
    ...render(
      <IntlProvider
        defaultFormats={defaultFormats}
        defaultLocale={defaultLocale}
        formats={formats}
        locale={locale}
        messages={messages}
        onError={onError}
        textComponent={textComponent}
        timeZone={timeZone}
      >
        {/*
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore TS2322 */}
        <ThemeProvider theme={theme}>
          <LocationProvider history={history}>{node}</LocationProvider>
        </ThemeProvider>
      </IntlProvider>
    ),
    history,
  }
}

export const emailBuilder = build<Email & TypeName>('Email').fields({
  id: fake(({ random }) => random.uuid()),
  isPrimary: bool(),
  isVerified: bool(),
  userId: fake(({ random }) => random.uuid()),
  value: fake(({ internet }) => internet.email()),
  createdAt: fake(({ date }) => date.past().toISOString()),
  updatedAt: fake(({ date }) => date.recent().toISOString()),
  __typename: 'Email',
})

export const profileBuilder = build<Profile & TypeName>('Profile').fields({
  id: fake(({ random }) => random.uuid()),
  familyName: fake(({ name }) => name.lastName()),
  givenName: fake(({ name }) => name.firstName()),
  userId: fake(({ random }) => random.uuid()),
  createdAt: fake(({ date }) => date.past().toISOString()),
  updatedAt: fake(({ date }) => date.recent().toISOString()),
  __typename: 'Profile',
})

export const responseErrorBuilder = build<ResponseError & TypeName>(
  'ResponseError'
).fields({
  id: fake(({ random }) => random.uuid()),
  message: 'An unknown error occurred; please try again later.',
  __typename: 'ResponseError',
})

export const enableTwoFactorAuthResponseBuilder = build<
  EnableTwoFactorAuthResponse & TypeName
>('EnableTwoFactorAuthResponse').fields({
  dataUrl:
    'data:image/png;base64,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',
  error: responseErrorBuilder(),
  secret: 'NYTDMZSWJ5NHUNCBKAUFOUB6OZBHA3Z3GJVUONZBEUSTCJDJEZ5Q',
  __typename: 'EnableTwoFactorAuthResponse',
})

export const responseBuilder = build<Response & TypeName>('Response').fields({
  error: responseErrorBuilder(),
  __typename: 'Response',
})

export const signInResponseBuilder = build<SignInResponse & TypeName>(
  'SignInResponse'
).fields({
  error: responseErrorBuilder(),
  isTwoFactorAuthEnabled: bool(),
  __typename: 'SignInResponse',
})

export const userBuilder = build<User & TypeName>('User').fields({
  id: fake(({ random }) => random.uuid()),
  emails: arrayOf(emailBuilder, 1),
  isAdmin: bool(),
  isTwoFactorAuthEnabled: bool(),
  profile: profileBuilder(),
  createdAt: fake(({ date }) => date.past().toISOString()),
  updatedAt: fake(({ date }) => date.recent().toISOString()),
  __typename: 'User',
})
