'use client';
import { HomeButton } from '@/components/HomeButton';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


export default function Error() {

  return (
    <main className="flex flex-col min-h-screen bg-background p-6 sm:p-12 relative">

      <div className="flex-grow flex flex-col items-center justify-center w-full gap-8">

        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-thin text-foreground text-center leading-tight tracking-tighter">
          An uncaught error has occured. Check the console for more information.
        </h1>

      </div>

      <div className="fixed bottom-10 right-10">
        <HomeButton />
      </div>
    </main >
  );
}
