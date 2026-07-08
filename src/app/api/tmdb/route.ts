import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';

// Only allow these endpoint patterns from the client
const ALLOWED_PATTERNS = [
  /^\/tv\/\d+\/season\/\d+$/,       // GET episode list for a season
  /^\/search\/multi$/,               // search
  /^\/movie\/\d+$/,                  // movie details
  /^\/tv\/\d+$/,                     // tv details
  /^\/movie\/\d+\/videos$/,          // movie videos/trailers
  /^\/tv\/\d+\/videos$/,             // tv videos/trailers
];

function isAllowedEndpoint(endpoint: string): boolean {
  return ALLOWED_PATTERNS.some((pattern) => pattern.test(endpoint));
}

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Server misconfiguration: missing API key' },
      { status: 500 }
    );
  }

  const endpoint = req.nextUrl.searchParams.get('endpoint');
  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 });
  }

  if (!isAllowedEndpoint(endpoint)) {
    return NextResponse.json({ error: 'Endpoint not allowed' }, { status: 403 });
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  req.nextUrl.searchParams.forEach((value, key) => {
    if (key !== 'endpoint') url.searchParams.set(key, value);
  });
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Upstream request failed' }, { status: 502 });
  }
}
