export type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base]

export type FilterFlags<Base, Condition> = {
  [Key in keyof Required<Base>]: Condition extends Extract<Base[Key], Condition>
    ? Key
    : never
}

type Primitive = boolean | number | string

export type Queried<Base> = { __typename: string } & SubType<Base, Primitive>

export type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>
