import { NextResponse } from 'next/server';
import { getTopHeadlines } from '@/lib/news';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { articles, error } = await getTopHeadlines();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  if (!articles || articles.length === 0) {
    return NextResponse.json({ error: 'No headlines found' }, { status: 404 });
  }

  const randomIndex = Math.floor(Math.random() * articles.length);
  const randomArticle = articles[randomIndex];

  return new NextResponse(randomArticle.title);
}
