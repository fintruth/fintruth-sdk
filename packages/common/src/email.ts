export interface BaseEmail {
  id: string
  isVerified: boolean
  value: string
}

export interface Email extends BaseEmail {
  createdAt: string
  updatedAt: string
}
