export const typeDefs = `#graphql
    type Game {
        id: ID! # Name of field, type of field. 
        title: String! # ! means it's required.
        platform: [String!]! # This means that there must be an array, and strings within the array. 
    }    

    type Review {
        id: ID!
        rating: Int!
        content: String!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }

    type Query {
        reviews: [Review]
        games: [Game]
        authors: [Author]
    }

`
