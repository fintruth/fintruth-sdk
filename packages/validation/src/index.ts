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

export interface LocaleObject {
  array?: { [key in keyof ArraySchema<any>]?: string }
  bool?: { [key in keyof BooleanSchema]?: string }
  boolean?: { [key in keyof BooleanSchema]?: string }
  date?: { [key in keyof DateSchema]?: string }
  mixed?: { [key in keyof MixedSchema]?: string } & { notType?: LocaleValue }
  number?: { [key in keyof NumberSchema]?: string }
  object?: { [key in keyof ObjectSchema<any>]?: string }
  string?: { [key in keyof StringSchema]?: string }
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
