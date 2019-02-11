import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Service } from 'typedi'
import { ValidationError, object, string } from '@fintruth-sdk/validation'
import { hash } from 'bcrypt'
import { is, isNil } from 'ramda'

import { Response, ResponseError, UserResponse } from 'resolvers/types'
import { User } from '../entities'

@Service()
export default class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async emailAvailable(email: string) {
    return isNil(await this.userRepository.findOne({ email }))
  }

  findById(id: string) {
    return this.userRepository.findOne(id)
  }

  async createUser(email: string, password: string) {
    const isAvailable = await this.emailAvailable(email)

    if (!isAvailable) {
      return new UserResponse({
        error: new ResponseError('The email is not available'),
      })
    }

    const user = await this.userRepository.save({ email, password })

    return new UserResponse({ user })
  }

  async updateEmail(id: string, password: string, newEmail: string) {
    const schemaOrError = await object()
      .shape({
        newEmail: string()
          .required()
          .email(),
      })
      .validate({ newEmail })
      .catch((error: ValidationError) => error)

    if (is(ValidationError, schemaOrError)) {
      return new UserResponse({
        error: new ResponseError(
          'There is an issue with the provided form values'
        ),
      })
    }

    const user = await this.findById(id)

    if (!user || !user.validatePassword(password)) {
      return new UserResponse({
        error: new ResponseError(
          'There is an issue with the provided form values'
        ),
      })
    }

    await this.userRepository.save({ ...user, email: newEmail })

    return new UserResponse({ user: await this.findById(id) })
  }

  async updatePassword(id: string, password: string, newPassword: string) {
    const schemaOrError = await object()
      .shape({
        newPassword: string()
          .required()
          .notOneOf([password])
          .password(2),
      })
      .validate({ newPassword })
      .catch((error: ValidationError) => error)

    if (is(ValidationError, schemaOrError)) {
      return new UserResponse({
        error: new ResponseError(
          'There is an issue with the provided form values'
        ),
      })
    }

    const user = await this.findById(id)

    if (!user || !user.validatePassword(password)) {
      return new UserResponse({
        error: new ResponseError(
          'There is an issue with the provided form values'
        ),
      })
    }

    await this.userRepository.save({
      ...user,
      password: await hash(newPassword, 10),
    })

    return new Response()
  }
}
