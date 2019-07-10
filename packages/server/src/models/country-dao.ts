import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'

import { Country } from '../entities'

@EntityRepository(Country)
@Service()
export default class CountryDao extends Repository<Country> {
  findByAlpha2CodeOrFail(alpha2Code: string) {
    return this.findOneOrFail({ alpha2Code })
  }
}
