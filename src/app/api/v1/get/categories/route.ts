import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/lib/news';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({ categories: CATEGORIES });
}
