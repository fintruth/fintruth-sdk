import gql from 'graphql-tag'

export interface Country {
  id: string
  alpha2Code: string
  callingCode: string
  name: string
}

export const shallowCountryPropsFragment = gql`
  fragment ShallowCountryProps on Country {
    id
    alpha2Code
    callingCode
    name
  }
`
