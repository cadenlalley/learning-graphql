import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Import database
import db from './_db.js';

// Import types
import { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find(game => game.id === args.id); // When the inner logic resolves to true, we will retrieve that object and send it to the client.
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find(review => review.id === args.id); // When the inner logic resolves to true, we will retrieve that object and send it to the client.
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id); // When the inner logic resolves to true, we will retrieve that object and send it to the client.
        }
    },

    Game: { // Given a single game object - using the single game query with id param...
        reviews(parent) { // Find the reviews associated with that game.
            return db.reviews.filter(review => review.game_id === parent.id); // Return all reviews associated with the current game.
        }
    },

    Author: {
        reviews(parent) {
            return db.reviews.filter(review => review.author_id === parent.id);
        }
    },

    Review: {
        author(parent) {
            return db.authors.find(author => author.id === parent.author_id);
        },
        game(parent) {
            return db.games.find(game => game.id === parent.game_id);
        }
    },

    Mutation: {
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game);

            return game;
        },
        deleteGame(_, args) {
            db.games = db.games.filter((game) => game.id != args.id);
            return db.games;
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return {...game, ...args.edits};
                }
                return game;
            });

            return db.games.find((game) => game.id === args.id)
        }
    }
}

// Server Setup
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`🚀 Server ready at ${url}`);
