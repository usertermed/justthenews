'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Article {
    title: string;
    url: string;
    source: string;
    publishedAt?: string;
}

interface BookmarksContextType {
    bookmarks: Article[];
    addBookmark: (article: Article) => void;
    removeBookmark: (url: string) => void;
    isBookmarked: (url: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
    const [bookmarks, setBookmarks] = useState<Article[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('jtn-bookmarks');
        if (saved) {
            try {
                setBookmarks(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse bookmarks:', e);
            }
        }
    }, []);

    const saveBookmarks = (newBookmarks: Article[]) => {
        setBookmarks(newBookmarks);
        localStorage.setItem('jtn-bookmarks', JSON.stringify(newBookmarks));
    };

    const addBookmark = (article: Article) => {
        if (!isBookmarked(article.url)) {
            const newBookmarks = [...bookmarks, article];
            saveBookmarks(newBookmarks);
        }
    };

    const removeBookmark = (url: string) => {
        const newBookmarks = bookmarks.filter(b => b.url !== url);
        saveBookmarks(newBookmarks);
    };

    const isBookmarked = (url: string) => {
        return bookmarks.some(b => b.url === url);
    };

    return (
        <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
            {children}
        </BookmarksContext.Provider>
    );
}

export function useBookmarks() {
    const context = useContext(BookmarksContext);
    if (context === undefined) {
        throw new Error('useBookmarks must be used within a BookmarksProvider');
    }
    return context;
}
