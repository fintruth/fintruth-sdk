import { object, string } from '@fintruth-sdk/validation'
import { hash } from 'bcrypt'
import { isNil, mergeLeft } from 'ramda'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { logAs, Loggable } from 'logger'
import { Response, ResponseError, UserResponse } from 'resolvers/types'
import { Profile, User } from '../entities'

@Service()
export default class UserService {
  @InjectRepository(User)
  userRepository: Repository<User>

  private log = logAs('UserService')
  private logDebug = (message: Loggable) => this.log(message, 'debug')

  async emailAvailable(email: string) {
    return isNil(await this.userRepository.findOne({ email }))
  }

  findById(id: string) {
    return this.userRepository.findOne(id)
  }

  async create(email: string, password: string, profile: Profile) {
    const valid = await object()
      .shape({
        email: string()
          .required()
          .email(),
        password: string()
          .required()
          .password(2),
      })
      .validate({ email, password })
      .catch(this.logDebug)

    if (!valid) {
      return new UserResponse({
        error: new ResponseError('invalid data provided'),
      })
    }

    if (!(await this.emailAvailable(email))) {
      return new UserResponse({
        error: new ResponseError('email is not available'),
      })
    }

    const user = await this.userRepository
      .save({
        email,
        password: await hash(password, 10),
        profile,
      })
      .catch(this.logDebug)

    if (!user) {
      return new UserResponse({
        error: new ResponseError('failed to save user'),
      })
    }

    return new UserResponse({ user })
  }

  async update(id: string, password: string, partial: Partial<User>) {
    const user = await this.findById(id)

    if (!user) {
      return new UserResponse({
        error: new ResponseError('user not found'),
      })
    }

    if (!user.validatePassword(password)) {
      return new UserResponse({
        error: new ResponseError('incorrect password'),
      })
    }

    const updated = await this.userRepository
      .update(user.id, partial)
      .catch(this.logDebug)

    if (!updated) {
      return new UserResponse({
        error: new ResponseError('failed to update user'),
      })
    }

    return new UserResponse({
      user: mergeLeft(partial, user) as User,
    })
  }

  async updateEmail(id: string, password: string, email: string) {
    const valid = await object()
      .shape({
        email: string()
          .required()
          .email(),
      })
      .validate({ email })
      .catch(this.logDebug)

    if (!valid) {
      return new UserResponse({
        error: new ResponseError(
          'there is an issue with the provided form values'
        ),
      })
    }

    return this.update(id, password, { email })
  }

  async updatePassword(id: string, password: string, newPassword: string) {
    const valid = await object()
      .shape({
        newPassword: string()
          .required()
          .notOneOf([password])
          .password(2),
      })
      .validate({ newPassword })
      .catch(this.logDebug)

    if (!valid) {
      return new Response({
        error: new ResponseError(
          'there is an issue with the provided form values'
        ),
      })
    }

    return this.update(id, password, {
      password: await hash(newPassword, 10),
    })
  }
}
