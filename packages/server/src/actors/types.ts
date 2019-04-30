export interface Message {
  type: string
}

export interface EmailType extends Message {
  recipient: string
}
