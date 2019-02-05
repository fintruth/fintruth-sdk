import { ValidationError, object, string } from '@fintruth-sdk/validation'
import { hash } from 'bcrypt'
import { is, isNil } from 'ramda'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '../entities'
import { logger } from 'logger'
import { RegisterResponse } from 'resolvers/types'
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

  async register(email: string, password: string): Promise<RegisterResponse> {
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
      .catch((error: ValidationError) => error)

    if (is(ValidationError, validated)) {
      return {
        error: {
          id: '8cf575e7-e073-481b-8be1-e7a3b7f8baf4',
          message: 'There is an issue with the provided form values',
        },
      }
    }

    const isAvailable = await this.emailAvailable(email)

    if (!isAvailable) {
      return {
        error: {
          id: 'b4b61626-17d8-402b-b001-ad030d4b3589',
          message: 'The user already exists',
        },
      }
    }

    const expiresAt = Date.now() + 60 * 60 * 1000
    const data: RegistrationTokenData = {
      email,
      expiresAt,
      password: await hash(password, 10),
    }
    const token = createToken(data)

    logger.info('Registration token: ', token)

    return { error: null }
  }

  private async createUser(email: string, password: string): Promise<User> {
    const isAvailable = await this.emailAvailable(email)

    if (!isAvailable) {
      throw new Error('The email is already taken')
    }

    return this.userRepository.save({ email, password })
  }
}
