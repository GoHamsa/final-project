import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createNote } from '../../../database/notes';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getUserBySessionToken,
  updateBalanceByUserId,
} from '../../../database/users';

const noteSchema = z.object({
  value: z.number().positive(),
});

export type CreateNoteResponseBodyPost =
  | {
      success: true;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateNoteResponseBodyPost>> {
  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate the data
  const result = noteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Authentication token is invalid' }],
      },
      { status: 401 },
    );
  }
  await updateBalanceByUserId(session.id, result.data.value);
  // 6. Return the text content of the note
  return NextResponse.json({
    success: true,
  });
}
