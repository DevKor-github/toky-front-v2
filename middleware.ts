import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access-token')?.value;
  const refreshToken = request.cookies.get('refresh-token')?.value;

  console.log(accessToken, refreshToken);

  const response = NextResponse.next();

  if (accessToken) response.cookies.set('access-token', accessToken);
  if (refreshToken) response.cookies.set('refresh-token', refreshToken);
  return response;
}
