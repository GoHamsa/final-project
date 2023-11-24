'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    //  This is not the secured way of doing returnTo
    // if (props.returnTo) {
    //   console.log('Checks Return to: ', props.returnTo);
    //   router.push(props.returnTo);
    // }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/login', 'page');
    router.refresh();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form
          className="flex flex-col gap-6 items-center"
          onSubmit={async (event) => await handleRegister(event)}
        >
          <label className="block text-sm font-bold mb-2">
            Username
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label className="block text-sm font-bold mb-2">
            Password
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
          <button className="btn btn-neutral">Login</button>

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
