import { apiRequest } from "../../../libs/api";
import type {
    SyncResponse,
    IntegrationStatusResponse,
    ConnectPlatformDto,
    DisconnectPlatformDto,
} from "../../../libs/types/shopify/shopify.dto";

// ═══════════════════════════════════════════
// Sync
// ═══════════════════════════════════════════

/** Shopify ma'lumotlarni sinxronlash (products, orders, customers) */
export async function syncShopifyData(
    brandId: string,
    resources?: string[],
): Promise<SyncResponse> {
    return apiRequest<SyncResponse>(`shopify/${brandId}/sync`, {
        method: "POST",
        auth: true,
        body: resources ? { resources } : {},
    });
}

// ═══════════════════════════════════════════
// Integrations
// ═══════════════════════════════════════════

/** Platformani ulash (Shopify, Meta, Google, TikTok) */
export async function connectPlatform(
    brandId: string,
    input: ConnectPlatformDto,
): Promise<IntegrationStatusResponse> {
    return apiRequest<IntegrationStatusResponse>(`integrations/connect/${brandId}`, {
        method: "POST",
        auth: true,
        body: input as unknown as Record<string, unknown>,
    });
}

/** Platformani uzish */
export async function disconnectPlatform(
    brandId: string,
    input: DisconnectPlatformDto,
): Promise<IntegrationStatusResponse> {
    return apiRequest<IntegrationStatusResponse>(`integrations/disconnect/${brandId}`, {
        method: "POST",
        auth: true,
        body: input as unknown as Record<string, unknown>,
    });
}
