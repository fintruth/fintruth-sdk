import {
  Country,
  Queried,
  shallowCountryPropsFragment,
} from '@fintruth-sdk/common'
import gql from 'graphql-tag'

type QueriedCountry = Queried<Country>

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
