import { Arg, ID, Query, Resolver } from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { CountryDao } from 'models'
import { Country } from '../entities'

@Resolver(Country)
export default class CountryResolver {
  @InjectRepository(Country)
  private readonly countryDao: CountryDao

  @Query(() => Country, { nullable: true })
  country(@Arg('id', () => ID) id: string) {
    return this.countryDao.findOne(id)
  }

  @Query(() => [Country])
  countries() {
    return this.countryDao.find()
  }
}
