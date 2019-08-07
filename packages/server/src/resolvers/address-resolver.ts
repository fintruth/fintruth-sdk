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
import { AddressService } from 'services'
import { Address } from '../entities'

@Resolver(() => Address)
export default class AddressResolver {
  @Inject()
  private readonly daos: Daos

  @Inject()
  private readonly addressService: AddressService

  @Query(() => Address, { nullable: true })
  address(@Arg('id', () => ID) id: string, @Ctx() { ability }: Context) {
    return this.addressService.findById(id, ability)
  }

  @FieldResolver()
  type(@Root() { typeId }: Address) {
    return this.daos.addressTypes.findById(typeId)
  }
}
