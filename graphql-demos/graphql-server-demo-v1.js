// Let's setup grapiql client tool to test our graphql server

// What is GraphiQL?
// GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries.
// It provides syntax highlighting, query validation, and 
// an interactive result pane which lets you click on a result field to query it again.


// we need express to run a server --
// npm i express

const express = require('express');
// We need express-graphql to run a graphql server

const { graphqlHTTP } =  require('express-graphql');

// we need to create express app
const app = express();
const PORT = 3005;

// the only api endpoint frontend should hit
app.use('/graphql', graphqlHTTP({
  schema: '',  // we will add schema here -- it is must
  graphiql: true // this will enable the graphiql client tool
}));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Open http://localhost:${PORT}/graphql`);
});

// Now we need to start the server -- node graphql-server-demo-v1.js