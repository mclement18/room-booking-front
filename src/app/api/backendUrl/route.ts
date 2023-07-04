import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.API_URL;
  if (apiUrl === undefined) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Missing Backend API URL' },
      { status: 500 }
    );
  }
  return NextResponse.json({ apiUrl });
}
