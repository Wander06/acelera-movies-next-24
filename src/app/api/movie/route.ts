// FILE: @/app/api/get-all-users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBConnection } from '@/app/database/connection';
import { Movie } from '@/app/models/Movie';

export const GET = async (_req: NextRequest) => {
  const connection = await getDBConnection();

  return NextResponse.json(
    await connection.getRepository(Movie).find(),
  );
};