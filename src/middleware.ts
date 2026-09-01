import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply to the generate API routes
  if (request.nextUrl.pathname.startsWith('/api/v1/generate')) {
    const validKeys = process.env.VALID_API_KEYS?.split(',').map(k => k.trim()).filter(k => k.length > 0) || [];
    
    // If keys are configured, enforce authentication
    if (validKeys.length > 0) {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized', details: 'Missing or invalid Authorization header. Expected Format: Bearer <token>' },
          { status: 401 }
        );
      }

      const token = authHeader.split(' ')[1];
      
      if (!validKeys.includes(token)) {
        return NextResponse.json(
          { error: 'Forbidden', details: 'Invalid API Key.' },
          { status: 403 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
