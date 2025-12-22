'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const GA_MEASUREMENT_ID = 'G-TZ0QFPW5H1';

export function Analytics() {
    const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);

    useEffect(() => {
        const storedConsent = localStorage.getItem('cookie_consent');
        if (storedConsent) {
            setConsent(storedConsent as 'granted' | 'denied');
        }
    }, []);

    const handleAccept = () => {
        setConsent('granted');
        localStorage.setItem('cookie_consent', 'granted');
    };

    const handleDecline = () => {
        setConsent('denied');
        localStorage.setItem('cookie_consent', 'denied');
    };

    return (
        <>
            {/* Google Analytics Scripts - Only load if consent is granted */}
            {consent === 'granted' && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
                    </Script>
                </>
            )}

            {/* Cookie Consent Banner - Only show if no choice has been made */}
            {consent === null && (
                <div className="fixed bottom-4 left-4 right-4 z-50 md:max-w-md">
                    <Card className="shadow-lg border-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Did someone say cookies?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                We use third-party cookies to analyze our traffic. Please indicate if you accept usage of cookies.
                            </p>
                            <p className="text-sm text-muted-foreground font-bold">
                                <a href="https://github.com/usertermed/justthenews/blob/main/COOKIES.md">Read more</a>
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-0">
                            <Button variant="outline" size="sm" onClick={handleDecline}>
                                Decline
                            </Button>
                            <Button size="sm" onClick={handleAccept}>
                                Accept
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}
