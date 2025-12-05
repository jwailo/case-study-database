import { NextRequest, NextResponse } from 'next/server';

const ASET_SECRET = 'ailo-sales-2024';

function validateAuthToken(token: string): boolean {
  if (!token) return false;

  const today = new Date().toISOString().split('T')[0];
  const expectedToken = Buffer.from(`${ASET_SECRET}-${today}`).toString('base64');

  return token === expectedToken;
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (validateAuthToken(token)) {
      const response = NextResponse.json({ success: true });

      // Set a secure cookie that expires in 7 days
      response.cookies.set('authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Token auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
