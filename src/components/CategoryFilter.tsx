'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/news';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/context/settings-context';

interface CategoryFilterProps {
    currentCategory?: string;
}

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { showCategories } = useSettings();

    // Helper to check if a category is active
    const isActive = (category: string | undefined) => {
        if (!category && !currentCategory) return true; // "All" is active if no currentCategory
        return category === currentCategory;
    };

    const handleToggle = (e: React.MouseEvent) => {
        // If the clicked item is the active one, toggle the menu.
        // We prevent default navigation because clicking the *active* pill shouldn't reload the page,
        // it should just open the menu.
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    if (!showCategories) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl px-4 min-h-[40px]">
            <AnimatePresence mode="popLayout" initial={false}>
                {/* "All" Pill */}
                {(isOpen || isActive(undefined)) && (
                    <motion.div
                        layout
                        key="all"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                        <Link
                            href="/"
                            onClick={(e) => isActive(undefined) ? handleToggle(e) : setIsOpen(false)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border select-none cursor-pointer block",
                                isActive(undefined)
                                    ? "bg-foreground text-background border-foreground font-bold"
                                    : "bg-background text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                            )}
                        >
                            {isActive(undefined) && !isOpen ? "All" : "All"}
                        </Link>
                    </motion.div>
                )}

                {/* Category Pills */}
                {CATEGORIES.map((category) => (
                    (isOpen || isActive(category)) && (
                        <motion.div
                            layout
                            key={category}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            <Link
                                href={`/?category=${category}`}
                                onClick={(e) => isActive(category) ? handleToggle(e) : setIsOpen(false)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border capitalize select-none cursor-pointer block",
                                    isActive(category)
                                        ? "bg-foreground text-background border-foreground font-bold"
                                        : "bg-background text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                                )}
                            >
                                {isActive(category) && !isOpen ? `${category}` : category}
                            </Link>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>
        </div>
    );
}
