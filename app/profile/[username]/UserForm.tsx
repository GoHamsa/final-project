'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../../migrations/00000-createTableusers';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route'; // brauchen wir diese zeile?

type Props = {
  params: { user: User };
};

export default function UserForm({ params }: Props) {
  const [firstname, setFirstname] = useState(params.user.firstname);
  const [lastname, setLastname] = useState(params.user.lastname);
  const [email, setEmail] = useState(params.user.email);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify({
        firstname,
        lastname,
        email,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${params.user.username}`);

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/login', 'page');
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleSubmit(event)}>
      <label>
        First Name
        <input
          onChange={(event) => setFirstname(event.currentTarget.value)}
          value={firstname}
        />
      </label>

      <label>
        Last Name
        <input
          onChange={(event) => setLastname(event.currentTarget.value)}
          value={lastname}
        />
      </label>
      <label>
        Email
        <input
          onChange={(event) => setEmail(event.currentTarget.value)}
          value={email}
        />
      </label>

      <button>Update</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
