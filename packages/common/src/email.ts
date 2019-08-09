import { BaseEntity } from './base-entity'

export interface Email extends BaseEntity {
  isPrimary: boolean
  isVerified: boolean
  userId: string
  value: string
}
