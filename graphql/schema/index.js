const { gql } = require('apollo-server-express')

export const typeDefs = gql`
  type Query {
    countryStats: CountryStats
  }

  type CountryStats {
    country: String
    confirmedDeaths: String
    confirmedCases: String
    recovered: String
  }
  type Subscription {
    countryDataSubscription: [CountryStats]
  }

  schema {
    query: Query
    subscription: Subscription
  }
`
