import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers'

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

// Add Express Middleware
server.applyMiddleware({ app })

// Web Socket Middleware
const httpServer = http.createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () => {
  console.log(`server is ready at http://localhost:4000${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:4000/${server.subscriptionsPath}`)
})
