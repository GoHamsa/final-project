import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { deleteUserById } from '../../../../../database/users';

type DeleteParams = { params: { id: string } };
export async function DELETE(request: NextApiRequest, params: DeleteParams) {
  const userId = parseInt(params.params.id);
  console.log(userId);
  // Perform authorization checks here.
  // ...

  // If authorized, delete the user and send a response.
  try {
    await deleteUserById(userId);
    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'User could not be deleted.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
