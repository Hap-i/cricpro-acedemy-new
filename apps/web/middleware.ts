import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'ngca-admin-secret-change-in-production';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

async function verifySession(cookieValue: string): Promise<boolean> {
  try {
    const [timestamp, sig] = cookieValue.split('.');
    if (!timestamp || !sig) return false;

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts) || Date.now() - ts > SESSION_TTL_MS) return false;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(ADMIN_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Decode hex signature to bytes
    const sigBytes = new Uint8Array(sig.match(/.{1,2}/g)!.map(b => parseInt(b, 16)));
    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(timestamp));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isAdminApiRoute = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth');

  if (!isAdminRoute && !isAdminApiRoute) return NextResponse.next();

  const sessionCookie = request.cookies.get('admin_session')?.value;
  const isAuthenticated = sessionCookie ? await verifySession(sessionCookie) : false;

  if (!isAuthenticated) {
    if (isAdminApiRoute) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
