import { NextRequest, NextResponse } from 'next/server';

// Simple password - no hashing to avoid any encoding issues
const VALID_PASSWORD = 'gotime';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const isValid = password === VALID_PASSWORD;

    if (isValid) {
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
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
