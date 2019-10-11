import { Inject, Service } from 'typedi'

import { Ability } from 'auth' // eslint-disable-line import/named
import { Daos } from 'models'
import { Country } from '../entities'

@Service()
export default class CountryService {
  @Inject()
  daos: Daos

  async findById(id: string, ability: Ability) {
    const country = await this.daos.countries.findOne(id)

    ability.throwUnlessCan('read', country)

    return country
  }

  getAll(ability: Ability) {
    ability.throwUnlessCan('read', Country)

    return this.daos.countries.find()
  }
}
