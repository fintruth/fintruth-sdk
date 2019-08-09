import { Country, shallowCountryPropsFragment } from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CountriesQueryData {
  countries: Country[]
}

export const countriesQuery = gql`
  query CountriesQuery {
    countries {
      ...ShallowCountryProps
    }
  }

  ${shallowCountryPropsFragment}
`
