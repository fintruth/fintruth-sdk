import { object, string } from '@fintruth-sdk/validation'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { AddressTypeDao } from 'models'
import { AddressInput } from 'resolvers/types'
import { Address, AddressType } from '../entities'

@Service()
export default class AddressService {
  @InjectRepository(AddressType)
  addressTypeDao: AddressTypeDao

  toEntity = async ({ typeName, ...input }: AddressInput) => {
    const { id } = await this.addressTypeDao.findByNameOrFail(typeName)

    return new Address({ typeId: id, ...input })
  }

  validateInput = (input: AddressInput) =>
    object<AddressInput>()
      .shape({
        city: string().required(),
        country: string().required(),
        line1: string().required(),
        line2: string(),
        postalCode: string().required(),
        subdivision: string().required(),
        typeName: string().required(),
      })
      .validate(input)
}
