import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { T } from '../../libs/theme/theme';
import { Ico } from '../../libs/components/common/Ico';
import { saveGoogleToken } from '../../api/user/POST/auth';
import { OAUTH_CALLBACK_STATUS } from '../../libs/enums/auth.enum';
import type { GoogleCallbackParams } from '../../libs/types/auth/auth.types';

// ─────────────────────────────────────────
//  /auth/callback
//
//  Backend redirects here after Google OAuth success:
//    GET /auth/callback?token=<accessToken>
//
//  This page:
//    1. Extracts the token from the URL query param
//    2. Saves it to localStorage via saveGoogleToken()
//    3. Redirects the user to the dashboard (or redirect param)
// ─────────────────────────────────────────

const AuthCallbackPage: NextPage = () => {
    const router = useRouter();
    const [status, setStatus] = useState<OAUTH_CALLBACK_STATUS>(OAUTH_CALLBACK_STATUS.LOADING);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // Router query is only available after hydration
        if (!router.isReady) return;

        const { token } = router.query as Partial<GoogleCallbackParams>;

        if (!token) {
            setStatus(OAUTH_CALLBACK_STATUS.ERROR);
            setErrorMsg('No token received from Google. Please try again.');
            return;
        }

        try {
            saveGoogleToken(token);
            setStatus(OAUTH_CALLBACK_STATUS.SUCCESS);

            // Small delay so user sees success state, then redirect
            setTimeout(() => {
                router.replace('/');
            }, 800);
        } catch {
            setStatus(OAUTH_CALLBACK_STATUS.ERROR);
            setErrorMsg('Failed to save authentication token. Please try again.');
        }
    }, [router.isReady, router.query]);

    return (
        <>
            <Head>
                <title>Signing in... | Engine115</title>
            </Head>
            <div className="auth-callback-page">
                <div className="callback-card">
                    <div className="callback-logo">
                        <Ico type="zap" size={22} color={T.accent} />
                        <span>Engine115</span>
                    </div>

                    {status === OAUTH_CALLBACK_STATUS.LOADING && (
                        <div className="callback-state">
                            <div className="spinner" />
                            <p>Completing sign-in with Google...</p>
                        </div>
                    )}

                    {status === OAUTH_CALLBACK_STATUS.SUCCESS && (
                        <div className="callback-state is-success">
                            <Ico type="check" size={28} color={T.green} />
                            <p>Signed in successfully! Redirecting...</p>
                        </div>
                    )}

                    {status === OAUTH_CALLBACK_STATUS.ERROR && (
                        <div className="callback-state is-error">
                            <Ico type="alert" size={28} color={T.red} />
                            <p>{errorMsg}</p>
                            <button
                                className="retry-btn"
                                onClick={() => router.replace('/account/join')}
                            >
                                Back to Sign In
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AuthCallbackPage;
