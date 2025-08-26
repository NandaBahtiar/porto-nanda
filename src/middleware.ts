import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const protectedPaths = ['/dashboard'];
  const isProtectedRoute = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

  // Jika pengguna mencoba mengakses halaman yang dilindungi...
  if (isProtectedRoute) {
    // 1. Jika mereka BELUM LOGIN (tidak ada token), alihkan.
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // 2. Jika mereka SUDAH LOGIN, cek emailnya.
    const authorizedEmails = (process.env.AUTHORIZED_EMAILS || "").split(",");
    const isAuthorized = authorizedEmails.includes(token.email as string);

    // Jika email pengguna TIDAK terdaftar, alihkan juga.
    if (!isAuthorized) {
      const url = req.nextUrl.clone();
      url.pathname = '/'; // Alihkan ke halaman utama
      return NextResponse.redirect(url);
    }
  }

  // 3. Jika semua pemeriksaan lolos, izinkan akses.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};