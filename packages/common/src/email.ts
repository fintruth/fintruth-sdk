export interface BaseEmail {
  id: string
  isVerified: boolean
  userId: string
  value: string
}

export interface Email extends BaseEmail {
  createdAt: string
  updatedAt: string
}
