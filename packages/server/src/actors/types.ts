export interface Message {
  type: string
}

export class PoisonPill implements Message {
  readonly type = 'PoisonPill'
}
