import {
  Country,
  Shallow,
  shallowCountryPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

type QueriedCountry = Shallow<Country>

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
