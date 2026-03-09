import { REACT_APP_API_URL } from './config';

// ── Token Helpers ──

export function getAccessToken(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('accessToken') ?? '';
}

export function setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
}

export function removeAccessToken(): void {
    localStorage.removeItem('accessToken');
}

// ── Base Fetch ──

interface ApiOptions extends Omit<RequestInit, 'body'> {
    body?: Record<string, unknown>;
    auth?: boolean;
}

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
    const { body, auth = false, headers: extraHeaders, ...rest } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(extraHeaders as Record<string, string>),
    };

    if (auth) {
        const token = getAccessToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${REACT_APP_API_URL}/${path}`, {
        ...rest,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody?.message ?? `HTTP ${res.status}`);
    }

    return res.json() as Promise<T>;
}
