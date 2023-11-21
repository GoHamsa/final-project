'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUsers } from '../../database/users';
import { User } from '../../migrations/00000-createTableusers';

type UserListProps = { users: User[] };

export default function UserList({ users }: UserListProps) {
  const [error, setError] = useState(null);
  const handleDelete = async (userId) => {
    try {
      // Make the API call to delete the user
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
      });
      window.location.reload();
    } catch (error) {
      // Catch and log any errors
      console.error('Failed to delete user', error);
      setError(error.message || 'Failed to delete user');
    }
  };

  if (error) return <div>Error loading users: {error}</div>;
  if (users.length === 0) return <div>Loading...</div>;

  return (
    <div className="mt-8">
      <p className="text-xl">Admin Page</p>
      <div className="min-w-[50%]">
        <table className="table table-auto table-lg">
          <thead>
            <tr>
              <th>User-id</th>
              <th>Username</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
