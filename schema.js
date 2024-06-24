export const typeDefs = `#graphql
    type Game {
        id: ID! # Name of field, type of field. 
        title: String! # ! means it's required.
        platform: [String!]! # This means that there must be an array, and strings within the array. 
        reviews: [Review!] # Relationship between different data.
    }    

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game! # Relationship between different data.
        author: Author! # Relationship between different data.
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!] # Relatiosnip between different data.
    }

    type Query {
        reviews: [Review]
        review(id: ID): Review # In order to query based on a field, you must delcare a graph entry point that defines a query variable and the enrty point into the graph.
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID): Author
    }

`
