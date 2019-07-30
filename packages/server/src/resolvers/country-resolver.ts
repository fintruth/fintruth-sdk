import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { Daos } from 'models'
import { Country } from '../entities'

@Resolver(() => Country)
export default class CountryResolver {
  @Inject()
  private readonly daos: Daos

  @Query(() => Country, { nullable: true })
  country(@Arg('id', () => ID) id: string) {
    return this.daos.countries.findById(id)
  }

  @Query(() => [Country])
  countries() {
    return this.daos.countries.find()
  }
}
