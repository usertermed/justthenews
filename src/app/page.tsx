import { getTopHeadlines } from '@/lib/news';
import { ShareButton } from '@/components/ShareButton';
import { ModeToggle } from '@/components/mode-toggle';
import { RefreshButton } from '@/components/RefreshButton';
import { ReadArticleButton } from '@/components/ReadArticleButton';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SettingsMenu } from '@/components/SettingsMenu';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  const { articles, error } = await getTopHeadlines({ category });

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
        <h1 className="text-4xl font-bold text-destructive">Hello Developer!</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{error}</p>
        {error.includes('API key') && (
          <p className="mt-4 rounded-md bg-muted p-4 text-sm text-muted-foreground">
            Hello! Please create a <code className="font-mono font-semibold text-foreground">.env.local</code> file in the root of your project and add your NewsAPI key like this: <br />
            <code className="font-mono font-semibold text-foreground">NEWS_API_KEY="YOUR_KEY_HERE"</code>.
            You can get a free key from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="underline font-semibold">newsapi.org</a>.
          </p>
        )}
      </main>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
        <div className="mb-8">
          <CategoryFilter currentCategory={category} />
        </div>
        <h1 className="font-headline text-5xl font-thin text-center text-foreground">
          No headlines found in this category.
        </h1>
        <div className="mt-8">
          <RefreshButton />
        </div>
      </main>
    );
  }

  // Pick a random headline on the server. This is safe from hydration errors.
  // Note: Since we are forcing dynamic rendering, this will run on every request.
  const randomIndex = Math.floor(Math.random() * articles.length);
  const headline = articles[randomIndex];

  return (
    <main className="flex flex-col min-h-screen bg-background p-6 sm:p-12 relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <SettingsMenu />
        <ModeToggle />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center w-full gap-8">
        <CategoryFilter currentCategory={category} />

        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-thin text-foreground text-center leading-tight tracking-tighter">
          {headline.title}
        </h1>
        <ReadArticleButton url={headline.url} />
        <RefreshButton />

      </div>

      <p className="text-center text-xs text-muted-foreground">
        <a href="https://github.com/usertermed/justthenews"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/usertermed/justthenews"></img></a>
        <img alt="Website" style={{ marginTop: '0.2rem' }} src="https://img.shields.io/website?url=https%3A%2F%2Fjustthenews.vercel.app%2Fapi%2Fv1%2Fstatus&up_message=ok&up_color=green&down_message=bad&down_color=red&label=api%20status"></img>
      </p>

      <div className="fixed bottom-10 right-10">
        <ShareButton title={headline.title} source={headline.source.name} />
      </div>
    </main >
  );
}
