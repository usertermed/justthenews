'use client';

import { Settings, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/context/settings-context';

import { useRouter } from 'next/navigation';

export function SettingsMenu() {
    const { showCategories, setShowCategories } = useSettings();
    const router = useRouter();

    const handleToggle = (checked: boolean) => {
        setShowCategories(checked);
        if (!checked) {
            router.push('/');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        <b>Customize your news experience.</b>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="show-categories" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                <b>Pills</b>
                            </Label>
                            <span className="text-sm text-muted-foreground">
                                <b> Show category filters ("Pills") at the top of the page. If disabled, categories are hidden, and all headlines are shown.</b>
                            </span>
                        </div>
                        <Switch
                            id="show-categories"
                            checked={showCategories}
                            onCheckedChange={handleToggle}
                        />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex flex-col space-y-1">
                            <Label className="text-base font-medium leading-none">
                                <b>Report a Bug</b>
                            </Label>
                            <span className="text-sm text-muted-foreground">
                                Found something broken? Let us know.
                            </span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <a href="https://github.com/usertermed/justthenews/issues/new?template=bug_report.md" target="_blank" rel="noopener noreferrer">
                                <Bug className="mr-2 h-4 w-4" />
                                Report
                            </a>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
