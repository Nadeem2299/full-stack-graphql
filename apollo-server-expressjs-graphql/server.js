import express from "express";
import cors from 'cors';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFile } from 'fs/promises'
import { resolvers } from "./Schemas/resolvers.js";

const PORT = '5000';

const app = express();

app.use(cors(), express.json());

// REST API Endpoint for authentication
app.post('/api/login', (req,res) => {
  console.log(req.body);
  res.json({
    msg: 'Under Construction'
  });
})

const typeDefs = await readFile('./schemas/schema.graphql', 'utf-8');

const apolloServer = new ApolloServer ({
  typeDefs: typeDefs, // schema
  resolvers: resolvers // resolver function
})

await apolloServer.start();

// URL in which graphql server is accessed
app.use('/graphql', expressMiddleware(apolloServer));

app.listen({port: PORT}, () => {
  console.log(`Apollo GraphQL server is running on localhost:${PORT}/graphql`);
  console.log(`REST API Endpoint for login is localhost:${PORT}/login`)
})
