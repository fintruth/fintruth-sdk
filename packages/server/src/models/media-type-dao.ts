import { EntityRepository, Repository } from 'typeorm'

import { MediaType } from '../entities'

@EntityRepository(MediaType)
export default class MediaTypeDao extends Repository<MediaType> {}
