import React from 'react';
import { logout } from './actions';

// Add a new prop type for className
interface LogoutButtonProps {
  className?: string;
}

// Use the className prop in your component
export default function LogoutButton({ className }: LogoutButtonProps) {
  return (
    <form>
      {/* Add the passed className or a default */}
      <button className={className || 'logoutButton'} formAction={logout}>
        Logout
      </button>
    </form>
  );
}
