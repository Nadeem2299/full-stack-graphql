export const typeDefs = `#graphql
# This is a comment in graphql
"""

multi line comment

"""
type User {
  id: ID!
  name: String
  email: String
  phone: String
}
type Post {
  id: ID!
  title: String!
  body: String!
}
type Query {
  hello: String,
  age: Int!,
  posts: [Post]!,
  postById(id: Int): Post, 
  users(limit: Int): [User]
}

# let us try mutation now - for createPost, updatePost, deletePost
type Mutation {
  createPost (title :String! ,body: String!) : Post,
  updatePost(id: Int!, title: String!, body: String!): Post,
  deletePost(id: Int!): String
  generateReport(name: String): String
}

type Report {
    id: ID!
    name: String!
    createdOn: String!
  }

  type Subscription {
    reportGenerated: Report
  }
`;
