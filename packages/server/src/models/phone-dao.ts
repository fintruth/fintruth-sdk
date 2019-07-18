import { EntityRepository, Repository } from 'typeorm'

import { Phone } from '../entities'

@EntityRepository(Phone)
export default class PhoneDao extends Repository<Phone> {}
