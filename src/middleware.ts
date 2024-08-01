import { type NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { cookies } from 'next/headers';
import { AUTH_TOKEN } from './lib/constants';
import { redirect } from 'next/navigation';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
      ],
}

const unauthenticatedRoutes = ['/login']


export async function middleware(req: NextRequest) {

  if ( unauthenticatedRoutes.includes(req.nextUrl.pathname)) return null;

  if (req.nextUrl.pathname === '/logout'){

    let nrr = NextResponse.redirect(new URL('/login', req.url))
    nrr.cookies.delete(AUTH_TOKEN)
    
    return nrr
  }

  let verifiedToken
  try {
    verifiedToken = await verifyAuth(req)
    
  } catch (error) {
    console.error(error)
    verifiedToken = null
  }

  if (!verifiedToken) {
    console.log("No verified token")
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ 'error': { message: 'authentication required' } }),
        { status: 401 });
    }
    // otherwise, redirect to the set token page
    else {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
}