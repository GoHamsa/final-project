'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { number } from 'zod';

export default function CreateNoteForm({ userId }: { userId: number }) {
  const [textContent, setTextContent] = useState(0);

  const router = useRouter();

  async function handleCreateNote() {
    await fetch('/api/deposit', {
      method: 'POST',
      body: JSON.stringify({
        value: textContent,
      }),
    });
    router.refresh();
    setTextContent(0);
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <form
          className="flex flex-col gap-6 items-center"
          onSubmit={async (event) => {
            event.preventDefault();
            await handleCreateNote();
          }}
        >
          <label className="block text-sm font-bold mb-2">
            Deposit:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  border-gray-700"
              value={textContent}
              type="number"
              onChange={(event) =>
                setTextContent(parseFloat(event.currentTarget.value))
              }
            />
          </label>
          <br />
          <br />
          <button className="btn btn-neutral">Submit</button>
        </form>
      </div>
    </div>
  );
}
