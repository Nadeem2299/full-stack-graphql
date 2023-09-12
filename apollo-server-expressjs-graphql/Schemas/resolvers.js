import axios from "axios";
import { GraphQLError } from "graphql";
// connecting to mongoDb and specific connection (table)
// import Users from '../models/users.model.js';

export const resolvers = {
  Query: {
    hello: () => "Hello World",
    age: () => 20,
    posts: async () => {
      // const postList = [
      //   {
      //     id: 12232,
      //     title: 'sdesed',
      //     body: 'sfdecffc'
      //   }
      // ]
      // return postList;
      // you can connect to 3rd party rest api employees or db
      try {
        // let's connect to third party rest api
        const result = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        console.log(result);
        return result.data;
      } catch (err) {
        throw new GraphQLError("Unable to fetch posts. Try again later", {
          extensions: { code: "UNABLE_TO_FETCH" },
        });
      }
    },
    postById: async (parent, args) => {
      // const postList = [
      //   {
      //     id: 12232,
      //     title: 'sdesed',
      //     body: 'sfdecffc'
      //   }
      // ]
      // return postList;
      // you can connect to 3rd party rest api employees or db
      // let's connect to third party rest api
      console.log(parent);
      console.log(args);
      try {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${args.id}`
      );
      console.log(result);
      return result.data;
      } catch (err) {
        throw new GraphQLError("No Posts found with id: " + args.id, {
          extensions:{code:"NO_POSTS"}
        });
      }
    },
    // users: async () => {
    //   // connect to db
    //   const result = await Users.find();
    //   console.log("=====Users Found=======")
    //   console.log(result);
    //   // exec db query as per mongoose syntax
    //   // get the data and return
    //   return result;
    // }
  },
  Mutation: {
    createPost: async (parent, args) => {
      console.log(args);
      const result = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        args
      );
      console.log(result);
      return result.data;
    },
    updatePost: async (parent, args) => {
      // console.log(args);
      const result = await axios.put(
        "https://jsonplaceholder.typicode.com/posts/" + args.id,
        args // form data
      );
      // console.log(result.data);
      return result.data;
    },
    deletePost: async (parent, args) => {
      const result = await axios.delete(
        "https://jsonplaceholder.typicode.com/posts/" + args.id
      );
      return "Deleted Successfuly";
    },
  },
};
