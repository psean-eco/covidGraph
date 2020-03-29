const { gql } = require('apollo-server-express');

export const typeDefs = gql`
    type Query {
    covid: String
    countryStats:CountryStats
    }

    type CountryStats{
        country:String
        confirmedDeaths:String
        confirmedCases:String
        recovered:String

    }
    type Subscription {
        subscribe2covid: [CountryStats]
    }

    schema {
        query: Query
        subscription: Subscription
    }
`;

