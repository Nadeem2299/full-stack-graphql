// Approach #2 using GraphqlSchema approach

const express = require("express");
// We need express-graphql to run a graphql server

const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

// we need to create express app
const app = express();
const PORT = 3005;

// Let's have Custom Object Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// STEP2: Setting up RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString, // return type
      resolve() {
        // connect to db here
        // get the data
        // send it back
        return "Hello"; // returning this data to the client(Frontend)
      },
    },
    age: {
      type: GraphQLInt,
      resolve() {
        // connect to db here
        // get the data
        // send it back
        return 20; // returning this data to the client(Frontend)
      },
    },
    quoteOfTheDay: {
      type: GraphQLString,
      resolve() {
        return Math.random() < 0.5 ? "Take it easy" : "Be Happy";
      },
    },
    userList: {
      type: new GraphQLList(UserType),
      resolve() {
        return [
          {
            id: 3245,
            name: "asdfgh",
            email: "a@b.com",
            phone: "32456789",
          },
          {
            id: 3245,
            name: "ouiytre",
            email: "o@k.com",
            phone: "9786543",
          },
        ];
      },
    },
    getUserById: {
      type: UserType,
      description: "Enter id to get userById",
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        console.log(args.id);
        const user = {
          id: args.id,
          name: "John",
          email: "j@k.com",
          phone: "234356787",
        };
        return user;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "MutationType",
  fields: {
    // Create User, Update User, Delete User
    createUser: {
      type: UserType, // return type
      args: {
        name: { type: GraphQLString }, // each argument type
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, { name, phone, email }) {
        console.log(parent);
        console.log(name);
        return {
          id: 9999,
          name,
          email,
          phone,
        };
      },
    },
  },
});

// STEP1: Let's setup schema properly
const schema = new GraphQLSchema({
  query: RootQuery, // it expects RootQuery
});

// the only api endpoint frontend should hit
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, // we will add schema here -- it is must
    graphiql: true, // this will enable the graphiql client tool
  })
);

app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Open http://localhost:${PORT}/graphql`
  );
});
