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
  const [street, setStreet] = useState(params.user.street);
  const [city, setCity] = useState(params.user.city);
  const [postalCode, setPostalCode] = useState(params.user.postalCode);
  const [country, setCountry] = useState(params.user.country);
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
        street,
        city,
        postalCode,
        country,
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
      <label>
        street
        <input
          onChange={(event) => setStreet(event.currentTarget.street)}
          value={street}
        />
      </label>
      <label>
        city
        <input
          onChange={(event) => setCity(event.currentTarget.city)}
          value={city}
        />
      </label>
      <label>
        Postal Code
        <input
          onChange={(event) => setPostalCode(event.currentTarget.postalCode)}
          value={postalCode}
        />
      </label>
      <label>
        country
        <input
          onChange={(event) => setCountry(event.currentTarget.country)}
          value={country}
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
