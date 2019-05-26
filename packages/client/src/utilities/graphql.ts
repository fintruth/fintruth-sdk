import { ProfileInput, RegisterInput } from '@fintruth-sdk/shared'
import { pickAll } from 'ramda'

export const toProfileInput: <T extends ProfileInput>(
  input: T
) => ProfileInput = pickAll(['familyName', 'givenName'])

export const toRegisterInput = <T extends RegisterInput>({
  profile,
  ...input
}: T): RegisterInput => ({
  profile: toProfileInput(profile),
  ...pickAll(['email', 'password'], input),
})
