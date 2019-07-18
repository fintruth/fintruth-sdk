import { EntityRepository, Repository } from 'typeorm'

import { Media } from '../entities'

@EntityRepository(Media)
export default class MediaDao extends Repository<Media> {}
