import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getUserBySessionToken,
  updateUserById,
} from '../../../../database/users';
import { User } from '../../../../migrations/00000-createTableusers';

const userSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email(),
  street: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.number().min(1),
  country: z.string().min(1),
});

export type UserUpdateResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<UserUpdateResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 5. Save the user information with the hashed password in the database
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const userSession =
    sessionToken && (await getUserBySessionToken(sessionToken.value));
  const user = await updateUserById(userSession?.id!, result.data);

  // 6. Return the new user information without the password hash
  return NextResponse.json({
    user: user as unknown as User,
  });
}
