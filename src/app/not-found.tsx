import { getTopHeadlines } from '@/lib/news';
import { ShareButton } from '@/components/ShareButton';
import { ModeToggle } from '@/components/mode-toggle';
import { NavigationButtons } from '@/components/NavigationButtons';
import {  HomeButton } from '@/components/HomeButton';
import { ReadArticleButton } from '@/components/ReadArticleButton';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SettingsMenu } from '@/components/SettingsMenu';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HomeProps {
  searchParams: Promise<{ category?: string; r?: string }>;
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
          No headlines found in this category. Are you lost?
        </h1>
        <div className="mt-8">
          <NavigationButtons currentCategory={category} />
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

      <div className="flex-grow flex flex-col items-center justify-center w-full gap-8">

        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-thin text-foreground text-center leading-tight tracking-tighter">
          404, your page hath not been found.
        </h1>

      </div>

      <div className="fixed bottom-10 right-10">
        <HomeButton />
      </div>
    </main >
  );
}
