import {
  ShallowCountry as QueriedCountry,
  shallowCountryPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

export interface CountriesQueryData {
  countries: QueriedCountry[]
}

export const countriesQuery = gql`
  query CountriesQuery {
    countries {
      ...ShallowCountryProps
    }
  }

  ${shallowCountryPropsFragment}
`
