// lets learn ablout building schema for Graphql server
// along with setting up graphiql client tool to test our graphql server

// Approach #1: Using buildSchema method

const express = require('express');
// We need express-graphql to run a graphql server

const { graphqlHTTP } =  require('express-graphql');
const { buildSchema } = require('graphql'); // npm i graphql
// we need to create express app
const app = express();
const PORT = 3005;

// We need to use buildSchema method to create schema
// We need to pass schema defination language (SQL) as string to buildSchema method
// SQL is a way to define schema in graphql
// SQL is a way to define type, queries, mutations, etc in graphql

const schema = buildSchema(`
  """ Here start Schema defination language """
  type Query {
    hello: String
  }
`)

// in order to handle the queries from frontend , we need to create resolver
// resolver is nothing but a function that returns data froma field
// resolver function should have same name as field name

const root = {
  // here's the resolver function for hello field
  hello: () => {
    // return the data for the hello field
    return 'Hello world!';
  }
};

// the only api endpoint frontend should hit
app.use('/graphql', graphqlHTTP({
  schema: schema,  // we will add schema here -- it is must
  rootValue: root,
  graphiql: true // this will enable the graphiql client tool
}));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Open http://localhost:${PORT}/graphql`);
});

// Now we need to start the server -- node graphql-server-demo-v1.js