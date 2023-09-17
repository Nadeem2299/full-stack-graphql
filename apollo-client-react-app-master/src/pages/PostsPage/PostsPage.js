import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const PostsPage = () => {
  const GET_POSTS = gql`
    query PostsQuery {
      posts {
        id
        title
        body
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POSTS, {
    fetchPolicy: "network-only", // Used for first execution
    // nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="row">
      <h1>Posts </h1>
      <div className="text-end">
        <Link to="add" className="btn btn-primary">
          Create a New Post
        </Link>
      </div>

      {data.posts?.map((post) => {
        return (
          <div className="col-md-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  #{post.id}
                </h6>
                <p className="card-text">{post.body}</p>
                <Link to={`/posts/${post.id}`} className="card-link">
                  View Post
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostsPage;
