import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Import types
import { typeDefs } from './typeDefs';

// Server Setup
const server = new ApolloServer({
    typeDefs,
    // typeDefs and resolvers...
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`🚀 Server ready at ${url}`);
