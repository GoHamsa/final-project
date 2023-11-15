import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
import { User } from '../../../migrations/00000-createTableusers';
import UserForm from './UserForm';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const userSession =
    sessionToken && (await getUserBySessionToken(sessionToken.value));
  if (userSession?.username !== params.username) {
    redirect('/404');
  }
  const user = (await getUserByUsername(userSession.username)) as User;
  return (
    <div>
      <h2>{params.username} Profile</h2>
      <UserForm
        params={{
          user: user,
        }}
      />
    </div>
  );
}
