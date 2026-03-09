import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../api';
import { getAuthUser } from '../../api/user/GET/auth';
import { logoutUser } from '../../api/user/POST/auth';

/**
 * withAuth — Global Authentication Guard HOC
 *
 * Wraps any page component to enforce authentication:
 * 1. Instantly redirects to /account/join if no token in localStorage
 * 2. Validates the token with the backend (GET /auth/getUser)
 * 3. If token is expired/invalid → force full logout + redirect
 * 4. Passes `redirect` query param so user lands back after login
 */
const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
    const AuthGuard: React.FC<P> = (props) => {
        const router = useRouter();
        const [verified, setVerified] = useState(false); // only render when auth is confirmed

        useEffect(() => {
            const currentPath = router.asPath;

            // Step 1: fast client-side token check
            if (!isLoggedIn()) {
                router.replace(`/account/join?redirect=${encodeURIComponent(currentPath)}`);
                return;
            }

            // Step 2: verify token with backend
            getAuthUser()
                .then(() => {
                    setVerified(true); // token is valid, render the page
                })
                .catch(() => {
                    // Token expired or invalid — clear storage and redirect
                    logoutUser();
                });
        }, []);

        // Don't render the protected content until verification is complete
        if (!verified) return null;

        return <Component {...props} />;
    };

    AuthGuard.displayName = `withAuth(${Component.displayName ?? Component.name ?? 'Component'})`;
    return AuthGuard;
};

export default withAuth;
