import { object, string } from '@fintruth-sdk/validation'
import { hash } from 'bcrypt'
import { isNil, mergeLeft } from 'ramda'
import { Inject, Service } from 'typedi'

import { Loggable, logAs } from 'logger'
import { Daos } from 'models'
import { Response, ResponseError, UserResponse } from 'resolvers/types'
import { Email, Profile, User } from '../entities'

@Service()
export default class UserService {
  @Inject()
  daos: Daos

  private editUser = (id: string, password: string) => async (
    cb: (user: User) => Promise<UserResponse>
  ) => {
    const user = await this.daos.users.findById(id)

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

    return cb(user)
  }

  private log = logAs('UserService')

  private logDebug = (message: Loggable) => this.log(message, 'debug')

  async addEmail(id: string, password: string, value: string) {
    return this.editUser(id, password)(async user => {
      const email = await Email.fromString(value).catch(this.logDebug)

      if (!email) {
        return new UserResponse({
          error: new ResponseError('invalid data provided'),
        })
      }

      if (!(await this.isEmailAvailable(value))) {
        return new UserResponse({
          error: new ResponseError('email is not available'),
        })
      }

      email.userId = id
      await this.daos.emails.save(email)

      const emails = await this.daos.emails.findByUser(id)

      return new UserResponse({
        user: mergeLeft({ emails }, user),
      })
    })
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

    if (!(await this.isEmailAvailable(email))) {
      return new UserResponse({
        error: new ResponseError('email is not available'),
      })
    }

    const user = await this.daos.users
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

  async isEmailAvailable(email: string) {
    return isNil(await this.daos.users.findByEmail(email))
  }

  async removeEmail(id: string, emailId: string) {
    const user = await this.daos.users.findById(id)

    if (!user) {
      return new UserResponse({
        error: new ResponseError('user not found'),
      })
    }

    const [, count] = await this.daos.emails.findAndCount({ userId: id })

    if (count === 1) {
      return new UserResponse({
        error: new ResponseError('one email is required'),
      })
    }

    await this.daos.emails.delete({ id: emailId, userId: id })

    const emails = await this.daos.emails.findByUser(id)

    return new UserResponse({
      user: mergeLeft({ emails }, user),
    })
  }

  async update(id: string, password: string, partial: Partial<User>) {
    return this.editUser(id, password)(async user => {
      const updated = await this.daos.users
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
    })
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
