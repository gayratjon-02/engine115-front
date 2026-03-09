import { apiRequest, setAccessToken, removeAccessToken } from '../../../libs/api';
import type { AuthResponse } from '../../../libs/types/auth/auth.types';
import type { LoginDto, RegisterDto, UpdateUserDto } from '../../../libs/types/user/user.dto';
import type { UserDto } from '../../../libs/types/user/user.dto';

// ─────────────────────────────────────────
//  POST /auth/login
//  Authenticates user with email + password.
//  On success: saves accessToken to localStorage.
// ─────────────────────────────────────────

export async function loginUser(input: LoginDto): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('auth/login', {
        method: 'POST',
        body: input as unknown as Record<string, unknown>,
    });

    setAccessToken(data.accessToken);
    return data;
}

// ─────────────────────────────────────────
//  POST /auth/register
//  Creates a new account with email + password.
//  On success: saves accessToken to localStorage.
// ─────────────────────────────────────────

export async function registerUser(input: RegisterDto): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('auth/register', {
        method: 'POST',
        body: input as unknown as Record<string, unknown>,
    });

    setAccessToken(data.accessToken);
    return data;
}

// ─────────────────────────────────────────
//  POST /auth/updateUser
//  Updates the authenticated user's profile.
//  Requires: Bearer token in Authorization header.
// ─────────────────────────────────────────

export async function updateUser(input: UpdateUserDto): Promise<UserDto> {
    return apiRequest<UserDto>('auth/updateUser', {
        method: 'POST',
        auth: true,
        body: input as unknown as Record<string, unknown>,
    });
}

// ─────────────────────────────────────────
//  Google OAuth — Token Save (Step 2)
//  Called from /auth/callback page after backend redirects with token.
//  Saves the Google-issued JWT to localStorage.
// ─────────────────────────────────────────

export function saveGoogleToken(token: string): void {
    if (!token) return;
    setAccessToken(token);
}

// ─────────────────────────────────────────
//  Logout
//  Clears token from localStorage & redirects to login.
//  After this, withAuth HOC blocks all protected pages.
// ─────────────────────────────────────────

export function logoutUser(): void {
    removeAccessToken();
    if (typeof window !== 'undefined') {
        window.location.href = '/account/join';
    }
}
