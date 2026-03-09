import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Stack } from '@mui/material';
import TopBar from '../common/TopBar';
import Sidebar from '../common/Sidebar';
import { T } from '../../theme/theme';

const withLayoutBasic = (Component: any) => {
    return (props: any) => {
        const router = useRouter();

        const memoizedValues = useMemo(() => {
            let pageId = 'dashboard';

            if (router.pathname.includes('/pnl')) pageId = 'pnl';
            else if (router.pathname.includes('/creatives')) pageId = 'creatives';
            else if (router.pathname.includes('/ltv')) pageId = 'ltv';

            return { pageId };
        }, [router.pathname]);

        // Layout implementation equivalent to App.tsx's structure
        return (
            <>
                <Head>
                    <title>Engine115</title>
                    <meta name={'title'} content={`Engine115 Next`} />
                </Head>
                <Stack
                    direction="row"
                    sx={{
                        height: '100vh',
                        background: T.bg,
                        color: T.text,
                        overflow: 'hidden',
                    }}
                >
                    {/* Sidebar */}
                    <Sidebar
                        page={memoizedValues.pageId as any}
                        onPageChange={(page) => {
                            if (page === 'dashboard') router.push('/');
                            else router.push(`/${page}`);
                        }}
                        collapsed={false}
                        onToggleCollapse={() => { }}
                    />

                    {/* Main Content Area */}
                    <Stack sx={{ flex: 1, overflow: 'hidden' }}>
                        <TopBar
                            page={memoizedValues.pageId as any}
                            dateRange={'14d'}
                            onDateRangeChange={() => { }}
                            customFrom={'2026-01-01'}
                            customTo={'2026-02-14'}
                            onCustomFromChange={() => { }}
                            onCustomToChange={() => { }}
                        />

                        <Stack
                            sx={{
                                flex: 1,
                                overflow: 'auto',
                                padding: '24px 28px 80px',
                            }}
                        >
                            <Component {...props} />
                        </Stack>
                    </Stack>
                </Stack>
            </>
        );
    };
};

export default withLayoutBasic;
