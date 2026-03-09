// ── Auth Provider Enum ──
// Identifies how a user authenticated (email/password vs OAuth provider)

export enum AUTH_PROVIDER {
    EMAIL = 'email',
    GOOGLE = 'google',
}

// ── OAuth Callback Status ──
// Used on the /auth/callback page to track token extraction state

export enum OAUTH_CALLBACK_STATUS {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
