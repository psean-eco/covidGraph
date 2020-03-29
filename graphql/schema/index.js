const { gql } = require('apollo-server-express');

export const typeDefs = gql`
    type Query {
    covid: String
    }
    type Subscription {
        subscribe2covid: String
    }
    schema {
        query: Query
        subscription: Subscription
    }
`;

