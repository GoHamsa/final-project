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
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6 ">
        <h1 className="text-center text-3xl font-bold my-8">Users Table</h1>
        <div className="flex justify-center">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-left">User-id</th>
                <th className="text-center">Username</th>
                <th className="text-right">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="hover" key={user.id}>
                  <td className="text-left">{user.id}</td>
                  <td className="text-center">{user.username}</td>
                  <td className="text-right">
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
