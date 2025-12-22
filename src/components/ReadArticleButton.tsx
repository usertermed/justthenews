import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ReadArticleButtonProps {
    url: string;
}

export function ReadArticleButton({ url }: ReadArticleButtonProps) {
    return (
        <Button variant="link" className="gap-2 text-muted-foreground hover:text-foreground" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Read this article
            </a>
        </Button>
    );
}
