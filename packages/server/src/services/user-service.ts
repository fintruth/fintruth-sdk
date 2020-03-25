import { object, string } from '@fintruth-sdk/validation'
import { hash } from 'bcrypt'
import { isNil, mergeLeft } from 'ramda'
import { Inject, Service } from 'typedi'

import { Ability } from 'auth'
import { Loggable, logAs } from 'logger'
import { Daos } from 'models'
import {
  Response,
  ResponseError,
  UserInput,
  UserResponse,
} from 'resolvers/types'
import ProfileService from './profile-service'
import { Email, User } from '../entities'

type UserResponseFn = (user: User) => Promise<UserResponse>

@Service()
export default class UserService {
  @Inject()
  daos: Daos

  @Inject()
  profileService: ProfileService

  private validateUser = (id: string) => async (fn: UserResponseFn) => {
    const user = await this.daos.users.findById(id)

    if (!user) {
      return new UserResponse({
        error: new ResponseError('user not found'),
      })
    }

    return fn(user)
  }

  private validateUserPassword = (id: string, password: string) => (
    fn: UserResponseFn
  ) => {
    return this.validateUser(id)(async (user) => {
      if (!user.validatePassword(password)) {
        return new UserResponse({
          error: new ResponseError('incorrect password'),
        })
      }

      return fn(user)
    })
  }

  private log = logAs('UserService')

  private logDebug = (message: Loggable) => this.log(message, 'debug')

  async addEmail(id: string, value: string, ability: Ability) {
    const email = await Email.fromString(value).catch(this.logDebug)

    if (!email) {
      return new UserResponse({
        error: new ResponseError('invalid data provided'),
      })
    }

    return this.validateUser(id)(async (user) => {
      if (!(await this.isEmailAvailable(value))) {
        return new UserResponse({
          error: new ResponseError('email is not available'),
        })
      }

      email.userId = id

      ability.throwUnlessCan('create', email)

      await this.daos.emails.save(email)

      const emails = await this.daos.emails.findByUser(id)

      return new UserResponse({
        user: mergeLeft({ emails }, user),
      })
    })
  }

  async create({ email, password, profile, isAdmin = false }: UserInput) {
    await UserInput.validate({ email, password, profile })

    if (!(await this.isEmailAvailable(email))) {
      return new UserResponse({
        error: new ResponseError('email is not available'),
      })
    }

    const user = await this.daos.users
      .save({
        emails: [
          new Email({ value: email, isPrimary: true, isVerified: true }),
        ],
        isAdmin,
        password: await hash(password, 10),
        profile: this.profileService.toEntity(profile),
      })
      .catch(this.logDebug)

    if (!user) {
      return new UserResponse({
        error: new ResponseError('failed to save user'),
      })
    }

    return new UserResponse({ user })
  }

  async isEmailAvailable(email: string) {
    return isNil(await this.daos.users.findByEmail(email))
  }

  async removeEmail(id: string, emailId: string, ability: Ability) {
    const email = await this.daos.emails.findById(emailId)

    ability.throwUnlessCan('delete', email)

    if (!email || email.isPrimary) {
      return new UserResponse({
        error: new ResponseError('unable to remove email'),
      })
    }

    return this.validateUser(id)(async (user) => {
      await this.daos.emails.delete({ id: emailId, userId: id })

      const emails = await this.daos.emails.findByUser(id)

      return new UserResponse({
        user: mergeLeft({ emails }, user),
      })
    })
  }

  async update(
    id: string,
    password: string,
    partial: Partial<User>,
    ability: Ability
  ) {
    return this.validateUserPassword(
      id,
      password
    )(async (user) => {
      ability.throwUnlessCan('update', user)

      await this.daos.users.update(id, partial)

      return new UserResponse({
        user: await this.daos.users.findById(id),
      })
    })
  }

  async updatePassword(
    id: string,
    password: string,
    newPassword: string,
    ability: Ability
  ) {
    const valid = await object()
      .shape({
        newPassword: string().required().notOneOf([password]).password(2),
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

    return this.update(
      id,
      password,
      {
        password: await hash(newPassword, 10),
      },
      ability
    )
  }
}
