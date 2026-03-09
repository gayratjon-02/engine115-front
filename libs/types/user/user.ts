import type { USER_ROLE } from '../../enums/user.enum';

// ── User ──

export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    role: USER_ROLE;
    createdAt: Date;
    updatedAt: Date;
}

// ── Auth Responses ──

export interface AuthResponse {
    accessToken: string;
    user: Pick<User, 'id' | 'email' | 'name' | 'avatarUrl' | 'role'>;
}

// ── Auth Request Bodies ──

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    name?: string;
}

// ── Update User ──

export interface UpdateUserInput {
    name?: string;
    avatarUrl?: string;
}

// ── Google OAuth ──

export interface GoogleProfile {
    googleId: string;
    email: string;
    name: string;
    avatarUrl?: string;
}
