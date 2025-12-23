'use client';

import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useBookmarks } from '@/context/bookmarks-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShareButton } from '@/components/ShareButton';
import { useSettings } from '@/context/settings-context';

export function BookmarksList() {
    const { showBookmarks } = useSettings();
    const { bookmarks, removeBookmark } = useBookmarks();

    if (!showBookmarks) return null;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Bookmark className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Saved Articles</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Saved Articles</SheetTitle>
                    <SheetDescription>
                        Your collection of headlines to read later.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-100px)] mt-4 pr-4">
                    {bookmarks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                            <Bookmark className="h-10 w-10 mb-2 opacity-20" />
                            <p>No bookmarks yet.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            {bookmarks.map((article, index) => (
                                <div key={`${article.url}-${index}`} className="flex flex-col space-y-2 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                                    <h3 className="font-semibold leading-none tracking-tight">
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {article.title}
                                        </a>
                                    </h3>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>{article.source}</span>
                                        <div className="flex items-center gap-2">
                                            <ShareButton title={article.title} source={article.source} url={article.url} />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 px-2 text-destructive hover:text-destructive/80"
                                                onClick={() => removeBookmark(article.url)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
