import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByUsername } from '../../../../database/users';
import { User } from '../../../../migrations/00000-createTableusers';

const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const body = await request.json();

  console.log('body: ', body);

  // 2. Validate the user data

  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  // 3. Check if user already exist in the database

  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 403 },
    );
  }
  console.log('user: ', user);

  // 4. Hash the plain password from the user

  const passwordHash = await bcrypt.hash(result.data.password, 12);
  console.log('passwordHash: ', passwordHash);
  console.log('password: ', result.data.password);

  // 5. Save the user information with the hashed password in the database
  const newUser = await createUser(result.data.username, passwordHash);
  console.log('New User: ', newUser);

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  // 6. Return the new user information without the password hash
  // ???
  // 4. Create Token
  // 5. Create the session record
  //  6. Send the new cookie in the headers to the browser

  return NextResponse.json({
    user: newUser,
  });
}
