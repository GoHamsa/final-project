'use client';

import { CldUploadWidget } from 'next-cloudinary';
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
    <div className="container mx-auto p-4">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form
          className="flex flex-col gap-6 items-center"
          onSubmit={async (event) => await handleSubmit(event)}
        >
          <div className="w-full max-w-xs">
            <label className="block text-sm font-bold mb-2">
              First Name
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
                onChange={(event) => setFirstname(event.currentTarget.value)}
                value={firstname}
              />
            </label>

            <label className="block text-sm font-bold mb-2">
              Last Name
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
                onChange={(event) => setLastname(event.currentTarget.value)}
                value={lastname}
              />
            </label>
            <label className="block text-sm font-bold mb-2">
              Email
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
                onChange={(event) => setEmail(event.currentTarget.value)}
                value={email}
              />
            </label>
            <label className="block text-sm font-bold mb-2">
              street
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
                onChange={(event) => setStreet(event.currentTarget.value)}
                value={street}
              />
            </label>
            <label className="block text-sm font-bold mb-2">
              city
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
                onChange={(event) => setCity(event.currentTarget.value)}
                value={city}
              />
            </label>
            <label className="block text-sm font-bold mb-2">
              Postal Code
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
                onChange={(event) => setPostalCode(event.currentTarget.value)}
                value={postalCode}
              />
            </label>
            <label className="block text-sm font-bold mb-2">
              country
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
                onChange={(event) => setCountry(event.currentTarget.value)}
                value={country}
              />
            </label>
          </div>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_CLOUDINARY_UPLOAD_PRESET}
          >
            {({ open }) => {
              return (
                <button className="btn btn-outline" onClick={() => open()}>
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
          <button className="btn btn-neutral">Update</button>

          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              Error: {error.message}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
