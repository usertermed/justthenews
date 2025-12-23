'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
    showCategories: boolean;
    setShowCategories: (show: boolean) => void;
    showBookmarks: boolean;
    setShowBookmarks: (show: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [showCategories, setShowCategories] = useState(true);
    const [showBookmarks, setShowBookmarks] = useState(true);

    useEffect(() => {
        const savedCategories = localStorage.getItem('jtn-settings-showCategories');
        if (savedCategories !== null) {
            setShowCategories(JSON.parse(savedCategories));
        }

        const savedBookmarks = localStorage.getItem('jtn-settings-showBookmarks');
        if (savedBookmarks !== null) {
            setShowBookmarks(JSON.parse(savedBookmarks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('jtn-settings-showCategories', JSON.stringify(showCategories));
    }, [showCategories]);

    useEffect(() => {
        localStorage.setItem('jtn-settings-showBookmarks', JSON.stringify(showBookmarks));
    }, [showBookmarks]);

    return (
        <SettingsContext.Provider value={{
            showCategories,
            setShowCategories,
            showBookmarks,
            setShowBookmarks
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
