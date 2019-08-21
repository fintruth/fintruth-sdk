import {
  ArraySchema,
  ArraySchemaConstructor,
  BooleanSchema,
  BooleanSchemaConstructor,
  DateSchema,
  DateSchemaConstructor,
  FormatErrorParams,
  InferType,
  Lazy,
  LocaleValue,
  MixedSchema,
  MixedSchemaConstructor,
  NotRequiredArraySchema,
  NotRequiredNullableArraySchema,
  NullableArraySchema,
  NumberSchema,
  NumberSchemaConstructor,
  ObjectSchema,
  ObjectSchemaConstructor,
  ObjectSchemaDefinition,
  Ref,
  Schema,
  SchemaDescription,
  Shape,
  TestContext,
  TestMessageParams,
  TestOptions,
  TestOptionsMessage,
  TransformFunction,
  ValidateOptions,
  ValidationError,
  WhenOptionsBuilderFunction,
  WhenOptionsBuilderObject,
  WhenOptionsBuilderObjectIs,
  addMethod,
  array,
  bool,
  boolean,
  date,
  isSchema,
  lazy,
  mixed,
  number,
  object,
  reach,
  ref,
  setLocale,
} from 'yup'

import {
  PasswordOptions,
  PhoneOptions,
  Score,
  StringSchema,
  StringSchemaConstructor,
  string,
} from './string'

export type AnySchemaConstructor =
  | MixedSchemaConstructor
  | StringSchemaConstructor
  | NumberSchemaConstructor
  | BooleanSchemaConstructor
  | DateSchemaConstructor
  | ArraySchemaConstructor
  | ObjectSchemaConstructor

type MappedLocaleSchema<S extends Schema<any>> = {
  [key in keyof S]?: S[key] extends (...args: infer P) => any
    ? MessageFromParameters<Required<P>>
    : never
}

type MessageFromParameters<P extends unknown[]> = {
  [K in keyof P]: P[K] extends TestOptionsMessage<any> ? P[K] : never
}[number]

export interface LocaleObject {
  array?: MappedLocaleSchema<ArraySchema<any>>
  bool?: MappedLocaleSchema<BooleanSchema>
  boolean?: MappedLocaleSchema<BooleanSchema>
  date?: MappedLocaleSchema<DateSchema>
  mixed?: MappedLocaleSchema<MixedSchema> & { notType?: LocaleValue }
  number?: MappedLocaleSchema<NumberSchema>
  object?: MappedLocaleSchema<ObjectSchema<any>>
  string?: MappedLocaleSchema<StringSchema>
}

export {
  ArraySchema,
  ArraySchemaConstructor,
  BooleanSchema,
  BooleanSchemaConstructor,
  DateSchema,
  DateSchemaConstructor,
  FormatErrorParams,
  InferType,
  Lazy,
  LocaleValue,
  MixedSchema,
  MixedSchemaConstructor,
  NotRequiredArraySchema,
  NotRequiredNullableArraySchema,
  NullableArraySchema,
  NumberSchema,
  NumberSchemaConstructor,
  ObjectSchema,
  ObjectSchemaConstructor,
  ObjectSchemaDefinition,
  PasswordOptions,
  PhoneOptions,
  Ref,
  Schema,
  SchemaDescription,
  Score,
  Shape,
  StringSchema,
  StringSchemaConstructor,
  TestContext,
  TestMessageParams,
  TestOptions,
  TestOptionsMessage,
  TransformFunction,
  ValidateOptions,
  ValidationError,
  WhenOptionsBuilderFunction,
  WhenOptionsBuilderObject,
  WhenOptionsBuilderObjectIs,
  addMethod,
  array,
  bool,
  boolean,
  date,
  isSchema,
  lazy,
  mixed,
  number,
  object,
  reach,
  ref,
  setLocale,
  string,
}
