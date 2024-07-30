import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const token = request.headers.get('Authorization')?.split(' ')[1];

  // if (!token) {
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup|forgotpassword).*)",
  ],
};