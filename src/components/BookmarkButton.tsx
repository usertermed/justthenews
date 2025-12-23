'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks, Article } from '@/context/bookmarks-context';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

import { useSettings } from '@/context/settings-context';

interface BookmarkButtonProps {
    article: Article;
    className?: string;
}

export function BookmarkButton({ article, className }: BookmarkButtonProps) {
    const { showBookmarks } = useSettings();
    const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
    const saved = isBookmarked(article.url);

    if (!showBookmarks) return null;

    const toggleBookmark = () => {
        if (saved) {
            removeBookmark(article.url);
            toast({ description: "Article removed from bookmarks." });
        } else {
            addBookmark(article);
            toast({ description: "Article added to bookmarks." });
        }
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className={cn("rounded-full h-12 w-12 hover:bg-muted", className)}
            onClick={toggleBookmark}
            title={saved ? "Remove bookmark" : "Save for later"}
        >
            <Star
                className={cn(
                    "h-6 w-6 transition-all duration-300",
                    saved ? "fill-yellow-400 text-yellow-400" : "fill-transparent"
                )}
            />
            <span className="sr-only">{saved ? "Remove bookmark" : "Save for later"}</span>
        </Button>
    );
}
