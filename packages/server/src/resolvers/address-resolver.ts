import {
  Arg,
  Authorized,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { Inject } from 'typedi'

import { Daos } from 'models'
import { Address } from '../entities'

@Resolver(() => Address)
export default class AddressResolver {
  @Inject()
  private readonly daos: Daos

  @Authorized()
  @Query(() => Address, { nullable: true })
  address(@Arg('id', () => ID) id: string) {
    return this.daos.addresses.findById(id)
  }

  @FieldResolver()
  type(@Root() { typeId }: Address) {
    return this.daos.addressTypes.findById(typeId)
  }
}
