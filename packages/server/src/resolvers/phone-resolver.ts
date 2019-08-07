import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { Inject } from 'typedi'

import { Context } from 'apollo'
import { Daos } from 'models'
import { PhoneService } from 'services'
import { Phone } from '../entities'

@Resolver(() => Phone)
export default class PhoneResolver {
  @Inject()
  private readonly daos: Daos

  @Inject()
  private readonly phoneService: PhoneService

  @Query(() => Phone, { nullable: true })
  phone(@Arg('id', () => ID) id: string, @Ctx() { ability }: Context) {
    return this.phoneService.findById(id, ability)
  }

  @FieldResolver()
  type(@Root() { typeId }: Phone) {
    return this.daos.phoneTypes.findById(typeId)
  }
}
