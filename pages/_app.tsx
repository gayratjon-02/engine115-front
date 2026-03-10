import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { fonts } from '../libs/theme/theme';
import '../scss/app.scss';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: 'var(--bg)',
            paper: 'var(--bgCard)',
        },
        primary: {
            main: '#00E5CC',
        },
        text: {
            primary: 'var(--text)',
            secondary: 'var(--muted)',
        },
    },
    typography: {
        fontFamily: fonts.sans,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text)',
                },
            },
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Engine115 PC</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
