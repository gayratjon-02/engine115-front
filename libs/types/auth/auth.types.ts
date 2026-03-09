import type { USER_ROLE } from '../../enums/user.enum';

// ── Shared User Shape ──
// Minimal user object returned inside AuthResponse

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    role: USER_ROLE;
}

// ── Auth API Responses ──
// Returned by login, register, and Google OAuth endpoints

export interface AuthResponse {
    accessToken: string;
    user: AuthUser;
}

// ── Google OAuth Callback ──
// Shape of the URL query params on /auth/callback?token=xxx

export interface GoogleCallbackParams {
    token: string;
}
