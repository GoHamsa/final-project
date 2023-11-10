import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import { getAnimals } from '../../database/animals';
import { getValidSessionByToken } from '../../database/sessions';

// import AnimalsForm from './AnimalsForm';

export const metadata = {
  title: 'Animal Admin page',
  description: 'Generated by create next app',
};

export default async function AnimalsPage() {
  // Task: Add redirect to home if user is logged in
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  //  Query your database to check if this user is admin

  // 3. If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) redirect('/login?returnTo=/admin');

  // 4. If the sessionToken cookie is valid, allow access to admin page
  // const animals = await getAnimals();

  // return <AnimalsForm animals={animals} />;
  return <>Admin Page</>;
}
