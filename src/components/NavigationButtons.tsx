'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
    currentCategory?: string;
}

export function NavigationButtons({ currentCategory }: NavigationButtonsProps) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleNext = () => {
        const seed = Math.random().toString(36).substring(7);
        const params = new URLSearchParams();
        if (currentCategory) params.set('category', currentCategory);
        params.set('r', seed);

        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full hover:bg-muted"
                onClick={handleBack}
                title="Previous Article"
            >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous Article</span>
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full hover:bg-muted"
                onClick={handleNext}
                title="Next Article"
            >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next Article</span>
            </Button>
        </div>
    );
}
