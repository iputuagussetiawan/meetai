'use client';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DashboardCommand from './dashboard-command';

const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [commandOpen, setCommandOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);
    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className="flex items-center gap-x-2 border-b bg-background px-4 py-3">
                <Button
                    className="size-9 cursor-pointer"
                    variant={'outline'}
                    onClick={toggleSidebar}
                >
                    {state === 'collapsed' || isMobile ? (
                        <PanelLeftIcon className="size-4" />
                    ) : (
                        <PanelLeftCloseIcon className="size-4" />
                    )}
                </Button>
                <Button
                    onClick={() => setCommandOpen((open) => !open)}
                    className="h-9 w-[240px] cursor-pointer justify-start font-normal text-muted-foreground hover:text-muted-foreground"
                    size={'sm'}
                    variant={'outline'}
                >
                    <SearchIcon className="size-4" />
                    Search...
                    <kbd className="pointer-events-none ml-auto inline-flex h-5 gap-1 rounded border border-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground select-none">
                        <span className="text-xs">&#8984;</span>
                    </kbd>
                </Button>
            </nav>
        </>
    );
};

export default DashboardNavbar;
