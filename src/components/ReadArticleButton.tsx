'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ReadArticleButtonProps {
    url: string;
}

export function ReadArticleButton({ url }: ReadArticleButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasSeenWarning, setHasSeenWarning] = useState(true); // Default to true to prevent flash on server/initial render

    useEffect(() => {
        // Check local storage on client mount
        const seen = localStorage.getItem('has_seen_external_warning');
        setHasSeenWarning(!!seen);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        if (!hasSeenWarning) {
            e.preventDefault();
            setIsOpen(true);
        }
        // If hasSeenWarning is true, the simple anchor tag link works as normal
    };

    const handleContinue = () => {
        localStorage.setItem('has_seen_external_warning', 'true');
        setHasSeenWarning(true);
        setIsOpen(false);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Button variant="link" className="gap-2 text-muted-foreground hover:text-foreground" asChild>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                >
                    <ExternalLink className="h-4 w-4" />
                    Read this article
                </a>
            </Button>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Just a heads up...</AlertDialogTitle>
                        <AlertDialogDescription>
                            <b>You are being taken to a third party site. We are not responsible for any content displayed on the site, nor do we endorse it.</b>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleContinue}><b>Continue</b></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
