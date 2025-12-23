'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export function HomeButton() {
    const router = useRouter();

    const handleHome = () => {
        router.push('/');
    };

    return (
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground" onClick={handleHome}>
            <Home className="h-4 w-4" />
            Go to safety
        </Button>
    );
}
