import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { Context } from 'apollo'
import { CountryService } from 'services'
import { Country } from '../entities'

@Resolver(() => Country)
export default class CountryResolver {
  @Inject()
  countryService: CountryService

  @Query(() => Country, { nullable: true })
  country(@Arg('id', () => ID) id: string, @Ctx() { ability }: Context) {
    return this.countryService.findById(id, ability)
  }

  @Query(() => [Country])
  countries(@Ctx() { ability }: Context) {
    return this.countryService.getAll(ability)
  }
}
