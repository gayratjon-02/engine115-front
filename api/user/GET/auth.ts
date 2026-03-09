import { apiRequest } from '../../../libs/api';
import type { User } from '../../../libs/types/user/user';

// ── GET /auth/getUser ──
// Returns the currently authenticated user based on Bearer token.

export async function getAuthUser(): Promise<User> {
    return apiRequest<User>('auth/getUser', {
        method: 'GET',
        auth: true,
    });
}
