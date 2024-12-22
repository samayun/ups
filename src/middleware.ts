import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();

  // Set custom header with the pathname
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}
