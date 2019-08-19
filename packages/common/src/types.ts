export type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base]

export type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Condition extends Extract<Base[Key], Condition>
    ? Key
    : never
}

export type Primitive = string | number | boolean

export type Shallow<Base> = SubType<Base, Primitive>

export type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>
