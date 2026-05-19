import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123';
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'ngca-admin-secret-change-in-production';

async function createSessionToken(): Promise<string> {
  const timestamp = Date.now().toString();
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(ADMIN_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(timestamp));
  const sig = Array.from(new Uint8Array(sigBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${timestamp}.${sig}`;
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_session');
  return response;
}
