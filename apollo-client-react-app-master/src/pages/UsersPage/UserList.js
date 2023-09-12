import { gql, useQuery } from "@apollo/client";
// import { GET_USERS } from "./graphql"; // Define your GraphQL query
import { useState } from "react";

const UserList = () => {
  const [cursor, setCursor] = useState(null);
  console.log(cursor);

  // constructing query
  const GET_USERS = gql`
    query ListUsers($limit: Int, $cursor: String) {
      users(limit: $limit, cursor: $cursor) {
        _id
        name
        email
        phone
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      cursor: cursor, // Initialize with null to fetch the first page
      limit: 2, // Adjust the limit as needed
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { users } = data;

  console.log(users);

  return (
    <div>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id} className="list-group-item">
            {user.name} - {user.email} 
            <p>{user.phone}</p>
          </li>
        ))}
      </ul>

      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => {
                setCursor(users[0]._id);
                // Fetch previous page of users using the new cursor
              }}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => {
                setCursor(users[users.length - 1]._id);
                // Fetch next page of users using the new cursor
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
