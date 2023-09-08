import axios from "axios";

export const resolvers = {
  Query: {
    hello: () => "Hello World",
    age: () => 20,
    posts: async() => {
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
      const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log(result);
      return result.data;
    }
  },
};
