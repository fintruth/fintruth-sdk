export interface BaseEmail {
  id: string
  isPrimary: boolean
  isVerified: boolean
  userId: string
  value: string
}

export interface Email extends BaseEmail {
  createdAt: string
  updatedAt: string
}
