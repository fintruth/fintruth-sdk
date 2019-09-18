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
  StringLocale,
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

interface ArrayLocale {
  min?: TestOptionsMessage<{ min: number }>
  max?: TestOptionsMessage<{ max: number }>
}

interface DateLocale {
  min?: TestOptionsMessage<{ min: Date | string }>
  max?: TestOptionsMessage<{ max: Date | string }>
}

export interface LocaleObject {
  mixed?: MixedLocale
  string?: StringLocale
  number?: NumberLocale
  date?: DateLocale
  boolean?: {}
  object?: ObjectLocale
  array?: ArrayLocale
}

interface MixedLocale {
  default?: TestOptionsMessage
  required?: TestOptionsMessage
  oneOf?: TestOptionsMessage<{ values: any }>
  notOneOf?: TestOptionsMessage<{ values: any }>
  notType?: LocaleValue
}

interface NumberLocale {
  min?: TestOptionsMessage<{ min: number }>
  max?: TestOptionsMessage<{ max: number }>
  lessThan?: TestOptionsMessage<{ less: number }>
  moreThan?: TestOptionsMessage<{ more: number }>
  positive?: TestOptionsMessage<{ more: number }>
  negative?: TestOptionsMessage<{ less: number }>
  integer?: TestOptionsMessage
}

interface ObjectLocale {
  noUnknown?: TestOptionsMessage
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
