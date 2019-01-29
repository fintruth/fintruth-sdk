import { object, string } from '@fintruth-sdk/validation'
import { hash } from 'bcrypt'
import { is, isNil } from 'ramda'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from 'entities/user'
import { RegistrationResponse } from 'resolvers/types'
import { createToken, parseToken } from 'security'

interface RegistrationTokenData {
  email: string
  expiresAt: number
  password: string
}

@Service()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findOne({ email })

    if (!user || !user.validatePassword(password)) {
      return null
    }

    return user
  }

  confirmRegistration(token: string) {
    const { email, expiresAt, password } = parseToken(token)
    const isExpired = expiresAt < Date.now()

    if (isExpired) {
      throw new Error('The provided token is expired')
    }

    return this.createUser(email, password)
  }

  async emailAvailable(email: string) {
    return isNil(await this.userRepository.findOne({ email }))
  }

  async register(
    email: string,
    password: string
  ): Promise<RegistrationResponse> {
    const schema = object().shape({
      email: string()
        .required()
        .email(),
      password: string()
        .required()
        .password(2),
    })

    const validated = await schema
      .validate({ email, password })
      .catch(error => error)

    if (is(Error, validated)) {
      const { message } = validated

      return { error: { message } }
    }

    const isAvailable = await this.emailAvailable(email)

    if (!isAvailable) {
      return { error: { message: 'User already exists' } }
    }

    const expiresAt = Date.now() + 60 * 60 * 1000
    const data: RegistrationTokenData = {
      email,
      expiresAt,
      password: await hash(password, 10),
    }

    return { token: createToken(data) }
  }

  private async createUser(email: string, password: string): Promise<User> {
    const isAvailable = await this.emailAvailable(email)

    if (!isAvailable) {
      throw new Error('The email is already taken')
    }

    return this.userRepository.save({
      email,
      password,
    })
  }
}
