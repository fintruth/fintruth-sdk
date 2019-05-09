export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
