'use client';

import { useState } from 'react';
import { Share2, Mail, MessageSquare, Twitter, Facebook, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';

interface ShareButtonProps {
    title: string;
    source: string;
}

export function ShareButton({ title, source }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    // NewsAPI often includes the source in the title (e.g., "Headline - Source").
    // We want to avoid "Headline - Source - Source".
    const cleanTitle = title.endsWith(` - ${source}`)
        ? title.slice(0, -(` - ${source}`.length))
        : title;

    const shareText = `${cleanTitle} - ${source}`;

    // Note: we can't reliably get the current URL in a server component prop easily without passed headers or using a hook.
    // Assuming for now we share the text. If we want to share the URL of the site, we can use window.location.href in client.
    // The requirement says "make the share only give the headline / source".
    // For platforms requiring a URL (FB, X), we might want to include the current page URL or just the text if possible.
    // Facebook sharer primarily needs a u (URL).
    // X (Twitter) allows text.

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            toast({
                description: "Headline copied to clipboard",
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = {
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}`,
        sms: `sms:?body=${encodeURIComponent(shareText)}`,
        // X (Twitter) allows text parameter
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        // Facebook sharer really wants a URL. We will try to pass the current window location if available, 
        // but the requirement purely focuses on headline/source. 
        // Facebook deprecated 'quote' parameter. Best we can do is share the current site URL. 
        // However, let's construct the link to open.
        facebook: `https://www.facebook.com/sharer/sharer.php`,
    };

    const handleFacebookShare = () => {
        // Facebook requires a URL. We use the current page.
        const url = typeof window !== 'undefined' ? window.location.href : 'https://justthenews.com';
        window.open(`${shareLinks.facebook}?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`, '_blank');
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full shadow-md">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share this</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="center" side="top" className="w-auto p-2">
                <div className="flex items-center gap-2">
                    <span>Share this headline</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.location.href = shareLinks.email}
                        title="Email"
                    >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.location.href = shareLinks.sms}
                        title="SMS"
                    >
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">SMS</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(shareLinks.twitter, '_blank')}
                        title="X / Twitter"
                    >
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">X</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleFacebookShare}
                        title="Facebook"
                    >
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        title="Copy"
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy</span>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
