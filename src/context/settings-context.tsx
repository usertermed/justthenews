'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
    showCategories: boolean;
    setShowCategories: (show: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [showCategories, setShowCategories] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('settings_show_categories');
        if (stored !== null) {
            setShowCategories(JSON.parse(stored));
        }
        setIsLoaded(true);
    }, []);

    const toggleCategories = (show: boolean) => {
        setShowCategories(show);
        localStorage.setItem('settings_show_categories', JSON.stringify(show));
    };

    // Prevent flash of wrong content by waiting for load (optional, but good for settings)
    // For this simple app, rendering default true then updating is fine.

    return (
        <SettingsContext.Provider value={{ showCategories, setShowCategories: toggleCategories }}>
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
