import type { USER_ROLE } from '../../enums/user.enum';

// ── Full User DTO ──
// Matches the User entity returned by GET /auth/getUser

export interface UserDto {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    role: USER_ROLE;
    googleId?: string | null;
    createdAt: string; // ISO date string from backend
    updatedAt: string;
}

// ── Login DTO ──

export interface LoginDto {
    email: string;
    password: string;
}

// ── Register DTO ──

export interface RegisterDto {
    email: string;
    password: string;
    name?: string;
}

// ── Update User DTO ──

export interface UpdateUserDto {
    name?: string;
    avatarUrl?: string;
}
