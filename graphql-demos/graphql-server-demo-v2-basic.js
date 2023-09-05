// lets learn ablout building schema for Graphql server
// along with setting up graphiql client tool to test our graphql server

// Approach #1: Using buildSchema method

const express = require("express");
// We need express-graphql to run a graphql server

const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql"); // npm i graphql
// we need to create express app
const app = express();
const PORT = 3005;

// We need to use buildSchema method to create schema
// We need to pass schema defination language (SQL) as string to buildSchema method
// SQL is a way to define schema in graphql
// SQL is a way to define type, queries, mutations, etc in graphql

const schema = buildSchema(`
  """ Here start Schema defination language """
  type User {
    id: ID,
    name: String,
    phone: String,
    email: String
  }
  
  type Query {
    hello: String,
    age: Int,
    quoteOfTheDay: String,
    greet(name: String): String,
    favMovies: [String],
    isAuth: Boolean,
    user: User,
    userList(name: String): [User]
  }
`);

// in order to handle the queries from frontend , we need to create resolver
// resolver is nothing but a function that returns data froma field
// resolver function should have same name as field name

const root = {
  // here's the resolver function for all our queries
  hello: () => {
    // return the data for the hello query
    // here you can make db calls, REST calls etc.
    return "Hello world!";
  },
  age: () => {
    // return the data for the hello query
    return 20;
  },
  quoteOfTheDay: () => {
    // return the data for the  quoteOfTheDay query
    return Math.random() < 0.5 ? "Take it easy" : "Be Happy";
  },
  greet: (args) => {
    console.log(args);
    return `Hey ${args.name} Good Morning`;
  },
  favMovies: () => {
    // return the data for the array of movies
    return [
      "Avengers-0",
      "Avengers-1",
      "Avengers-2",
      "Avengers-3",
      "Avengers-4",
    ];
  },
  isAuth: () => {
    // return the data for the isAuth query
    return true;
  },
  user: () => {
    return {
      id: 1,
      name: 'Nadeem',
      phone: '232323',
      email: 'n@k.com'
    }
  },
  userList: (args) => {
    console.log(args.name);
    const users = [
      {
        id: 1,
        name: 'Nadeem',
        phone: '232323',
        email: 'n@k.com'
      },
      {
        id: 2,
        name: 'Nadeem',
        phone: '23232323',
        email: 'n@ak.com'
      }
    ];
    // Using js find agrs.id as matching with the users array
    const matchingUsers = users.filter((user) => {
      if (user.name == args.name)
      return user;
    })
    return matchingUsers;
  }
};

// the only api endpoint frontend should hit
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, // we will add schema here -- it is must
    rootValue: root,
    graphiql: true, // this will enable the graphiql client tool
  })
);

app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Open http://localhost:${PORT}/graphql`
  );
});

// Now we need to start the server -- node graphql-server-demo-v1.js
