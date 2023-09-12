import { gql, useMutation } from "@apollo/client";
import React, {  useState } from "react";

const AddPostPage = () => {
  const ADD_POST = gql`
    mutation CreatePost($title: String!, $body: String!) {
      post: createPost(title: $title, body: $body) {
        id
        title
        body
      }
    }
  `;

  const [formState, setFormState] = useState({
    title: "",
    body: "",
  });

  const [mutateFunction, { loading, error, data }] = useMutation(ADD_POST);

  const handleSubmit = (event) => {
    event.preventDefault();
    mutateFunction({ variables: { title: formState.title, body: formState.body }});
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2>Add Post</h2>

      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formState.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              type="text"
              className="form-control"
              name="body"
              value={formState.body}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {loading ? "Submitting" : "Submit"}
          </button>

          {error && (
            <div className="alert alert-danger">Some error occurred!</div>
          )}
          {data && (
            <div className="alert alert-success">
              Post Created! Post Id : {data.post.id}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPostPage;
