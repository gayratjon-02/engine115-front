import { apiRequest, getAccessToken, setAccessToken, removeAccessToken } from '../../../libs/api';
import type { AuthResponse, LoginInput, RegisterInput, UpdateUserInput, User } from '../../../libs/types/user/user';

// ── GET /auth/getUser ──
// Returns the currently authenticated user based on the Bearer token.

export async function getAuthUser(): Promise<User> {
    return apiRequest<User>('auth/getUser', {
        method: 'GET',
        auth: true,
    });
}

// ── POST /auth/login ──

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('auth/login', {
        method: 'POST',
        body: input as unknown as Record<string, unknown>,
    });

    setAccessToken(data.accessToken);
    return data;
}

// ── POST /auth/register ──

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('auth/register', {
        method: 'POST',
        body: input as unknown as Record<string, unknown>,
    });

    setAccessToken(data.accessToken);
    return data;
}

// ── POST /auth/updateUser ──

export async function updateUser(input: UpdateUserInput): Promise<User> {
    return apiRequest<User>('auth/updateUser', {
        method: 'POST',
        auth: true,
        body: input as unknown as Record<string, unknown>,
    });
}

// ── Logout (client-side) ──

export function logoutUser(): void {
    removeAccessToken();
    window.location.href = '/account/join';
}

// ── Check if logged in ──

export function isLoggedIn(): boolean {
    return Boolean(getAccessToken());
}
