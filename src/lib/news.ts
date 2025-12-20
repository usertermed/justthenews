export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
  code?: string;
  message?: string;
}

export async function getTopHeadlines(): Promise<{ articles: Article[] | null; error: string | null }> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return { articles: null, error: 'NewsAPI key is not configured. Please add NEWS_API_KEY to your environment variables.' };
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    const data: NewsApiResponse = await response.json();

    if (!response.ok) {
        const errorMessage = data.message || `An error occurred: ${response.statusText}`;
        console.error('NewsAPI Error:', errorMessage);
        return { articles: null, error: `Failed to fetch headlines. ${errorMessage}` };
    }
    
    if (data.status !== 'ok') {
        return { articles: null, error: data.message || 'An unknown API error occurred.' };
    }

    // Filter out articles that don't have a title
    const validArticles = data.articles.filter(article => article.title);

    return { articles: validArticles, error: null };
  } catch (error) {
    console.error('Fetch Error:', error);
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      return { articles: null, error: 'Network error: Failed to connect to the news service.' };
    }
    return { articles: null, error: 'An unexpected error occurred while trying to fetch news.' };
  }
}
