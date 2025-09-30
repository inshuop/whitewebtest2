import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Get the token (session)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('Token:', token); // Add a log to check the token

  // Skip the middleware if the user is already on the login page
  if (req.url.includes('/admin/login')) {
    return NextResponse.next();
  }

  // If there's no token (not logged in) and the user is trying to access admin pages, redirect to login
  if (!token && req.url.includes('/admin')) {
    console.log('Redirecting to login'); // Add a log before redirect
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Allow the request to proceed to the requested page
  return NextResponse.next();
}
