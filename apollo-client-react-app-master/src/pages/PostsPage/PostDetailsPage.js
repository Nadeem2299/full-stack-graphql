import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const PostDetailsPage = () => {
  // reading url param
  const { postId } = useParams();

  const GET_POSTS = gql`
    query PostQuery($id: Int!) {
      post: postById(id: $id) {
        id
        title
        body
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { id: parseInt(postId) }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="row">
      <h1>PostDetailsPage</h1>
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{data.post.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {data.post.id}
            </h6>
            <p className="card-text">{data.post.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
