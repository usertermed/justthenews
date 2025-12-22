import { NextResponse } from 'next/server';
import { getTopHeadlines } from '@/lib/news';

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ category: string }> }
) {
    const category = (await params).category;

    const { articles, error } = await getTopHeadlines({ category });

    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    if (!articles || articles.length === 0) {
        return NextResponse.json({ error: 'No articles found in this category' }, { status: 404 });
    }

    // Pick a random headline
    const randomIndex = Math.floor(Math.random() * articles.length);
    const headline = articles[randomIndex];

    return NextResponse.json(headline);
}
