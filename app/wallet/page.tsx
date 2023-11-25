import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserNoteBySessionToken,
} from '../../database/users';
import CreateNoteForm from './CreateNotesForm';

export default async function NotesPage() {
  // Task: Restrict access to the notes page and only display notes belonging to the current logged in user
  // 1. Check if the sessionToken cookie exists
  // 2. Query user with the sessionToken
  // 3. If the user exists, render the page
  // 4. If the user does not exist, redirect to the

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/notes');

  // Display the notes for the current logged in user
  const userNote = await getUserNoteBySessionToken(sessionTokenCookie.value);

  console.log('Checking: ', userNote);

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mt-8">
          <CreateNoteForm userId={user.id} />

          <div className="flex flex-col gap-6 items-center">
            {userNote.length > 0 ? (
              <>
                <h2 className="block text-sm font-bold mb-2">Your Balance</h2>
                <ul className="flex flex-col gap-6 items-center">
                  {userNote.map((note) => (
                    <li key={`animal-div-${note.noteId}`}>
                      {note.textContent} $
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <h2></h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
