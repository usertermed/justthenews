'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function RefreshButton() {
    const router = useRouter();

    const handleRefresh = () => {
        router.refresh();
    };

    return (
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            Next article
        </Button>
    );
}
