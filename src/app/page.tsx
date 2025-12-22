import { getTopHeadlines } from '@/lib/news';
import { ShareButton } from '@/components/ShareButton';

export default async function Home() {
  const { articles, error } = await getTopHeadlines();

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
      <main className="flex min-h-screen items-center justify-center bg-background p-8">
        <h1 className="font-headline text-5xl font-thin text-center text-foreground">
          API replied with no headlines. Check your network connection.
        </h1>
      </main>
    );
  }

  // Pick a random headline on the server. This is safe from hydration errors.
  const randomIndex = Math.floor(Math.random() * articles.length);
  const headline = articles[randomIndex];

  return (
    <main className="flex flex-col min-h-screen bg-background p-6 sm:p-12">
      <div className="flex-grow flex items-center justify-center w-full">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-thin text-black text-center leading-tight tracking-tighter">
          {headline.title}
        </h1>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        <a href="https://github.com/usertermed/justthenews"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/usertermed/justthenews"></img></a>
      </p>

      <div className="fixed bottom-10 right-10">
        <ShareButton title={headline.title} source={headline.source.name} />
      </div>
    </main >
  );
}
