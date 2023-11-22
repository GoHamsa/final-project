import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserNoteBySessionToken,
} from '../../database/users';
import CreateNoteForm from '../notes/CreateNotesForm';

export default async function NotesPage() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/notes');

  const userNote = await getUserNoteBySessionToken(sessionTokenCookie.value);

  console.log('Checking: ', userNote);

  return (
    <div className="mt-8">
      <CreateNoteForm userId={user.id} />

      <br />
      <br />
      <br />
      <div>
        <h2>Notes For {user.username}</h2>
        <ul>
          {userNote.map((note) => (
            <li key={`animal-div-${note.noteId}`}>{note.textContent}</li>
          ))}
        </ul>
        <h2> No notes yet</h2>
      </div>
    </div>
  );
}
