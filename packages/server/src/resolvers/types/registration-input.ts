import { InputType } from 'type-graphql'

import { LoginInput } from './login-input'

@InputType()
export class RegistrationInput extends LoginInput {}
