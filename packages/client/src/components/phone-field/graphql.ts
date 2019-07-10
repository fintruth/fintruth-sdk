import { Country } from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CountriesQueryData {
  countries: Country[]
}

export const countriesQuery = gql`
  query CountriesQuery {
    countries {
      id
      alpha2Code
      callingCode
      name
    }
  }
`
