import axios from "axios";
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
      // let's connect to third party rest api
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(result);
      return result.data;
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
      console.log(args);
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${args.id}`
      );
      console.log(result);
      return result.data;
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
    }
  },
};
