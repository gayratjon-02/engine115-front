import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { fonts, T } from '../libs/theme/theme';
import '../scss/app.scss';

// Create a minimalist MUI theme adhering to the predefined T constants
const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: T.bg,
            paper: T.bgCard,
        },
        primary: {
            main: T.accent,
        },
        text: {
            primary: T.text,
            secondary: T.muted,
        },
    },
    typography: {
        fontFamily: fonts.sans,
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
