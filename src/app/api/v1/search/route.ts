import { NextResponse } from 'next/server';
import { getTopHeadlines } from '@/lib/news';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: 'Missing search query parameter "q"' }, { status: 400 });
    }

    const { articles, error } = await getTopHeadlines({ q });

    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    if (!articles || articles.length === 0) {
        return NextResponse.json({ error: 'No articles found matching query' }, { status: 404 });
    }

    // Pick a random headline
    const randomIndex = Math.floor(Math.random() * articles.length);
    const headline = articles[randomIndex];

    return NextResponse.json(headline);
}
