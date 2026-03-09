import { apiRequest } from '../../../libs/api';
import { REACT_APP_API_URL } from '../../../libs/config';
import type { UserDto } from '../../../libs/types/user/user.dto';

// ─────────────────────────────────────────
//  GET /auth/getUser
//  Returns the currently authenticated user.
//  Requires: Bearer token in Authorization header.
// ─────────────────────────────────────────

export async function getAuthUser(): Promise<UserDto> {
    return apiRequest<UserDto>('auth/getUser', {
        method: 'GET',
        auth: true,
    });
}

// ─────────────────────────────────────────
//  Google OAuth — Step 1
//  Redirects browser to backend's Google OAuth initiation URL.
//  Backend will handle the full OAuth flow and redirect back to
//  /auth/callback?token=<accessToken> on success.
// ─────────────────────────────────────────

export function redirectToGoogleAuth(): void {
    if (typeof window !== 'undefined') {
        window.location.href = `${REACT_APP_API_URL}/auth/google`;
    }
}

// ─────────────────────────────────────────
//  GET /auth/google/callback
//  This is handled server-side by the backend.
//  The backend redirects to /auth/callback?token=xxx on the frontend.
//  See: pages/auth/callback.tsx for the frontend handler.
// ─────────────────────────────────────────
