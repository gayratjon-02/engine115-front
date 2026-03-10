import { apiRequest } from "../../../libs/api";
import { REACT_APP_API_URL } from "../../../libs/config";
import type {
    PaginatedProductsResponse,
    PaginatedOrdersResponse,
    PaginatedCustomersResponse,
    PaginatedRefundsResponse,
    PaginatedCheckoutsResponse,
    SyncStatusResponse,
    GetProductsQuery,
    GetOrdersQuery,
    GetCustomersQuery,
    GetRefundsQuery,
    GetCheckoutsQuery,
    AllIntegrationsResponse,
} from "../../../libs/types/shopify/shopify.dto";

// ═══════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════

function toQueryString(params: Record<string, unknown>): string {
    const entries = Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== "",
    );
    if (entries.length === 0) return "";
    const qs = new URLSearchParams(
        entries.map(([k, v]) => [k, String(v)]),
    ).toString();
    return `?${qs}`;
}

// ═══════════════════════════════════════════
// OAuth
// ═══════════════════════════════════════════

/** Shopify OAuth oynasiga yo'naltirish */
export function redirectToShopifyAuth(brandId: string, shop: string): void {
    if (typeof window !== "undefined") {
        window.location.href = `${REACT_APP_API_URL}/shopify/${brandId}/auth?shop=${encodeURIComponent(shop)}`;
    }
}

// ═══════════════════════════════════════════
// Sync Status
// ═══════════════════════════════════════════

/** Shopify sinxronlash holatini olish */
export async function getShopifySyncStatus(brandId: string): Promise<SyncStatusResponse> {
    return apiRequest<SyncStatusResponse>(`shopify/${brandId}/sync/status`, {
        method: "GET",
        auth: true,
    });
}

// ═══════════════════════════════════════════
// Products
// ═══════════════════════════════════════════

/** Shopify mahsulotlarni olish (pagination + filter) */
export async function getShopifyProducts(
    brandId: string,
    query?: GetProductsQuery,
): Promise<PaginatedProductsResponse> {
    const qs = query ? toQueryString(query) : "";
    return apiRequest<PaginatedProductsResponse>(`shopify/${brandId}/products${qs}`, {
        method: "GET",
        auth: true,
    });
}

// ═══════════════════════════════════════════
// Orders
// ═══════════════════════════════════════════

/** Shopify buyurtmalarni olish (pagination + filter + sort) */
export async function getShopifyOrders(
    brandId: string,
    query?: GetOrdersQuery,
): Promise<PaginatedOrdersResponse> {
    const qs = query ? toQueryString(query) : "";
    return apiRequest<PaginatedOrdersResponse>(`shopify/${brandId}/orders${qs}`, {
        method: "GET",
        auth: true,
    });
}

// ═══════════════════════════════════════════
// Customers
// ═══════════════════════════════════════════

/** Shopify mijozlarni olish (pagination + filter + sort) */
export async function getShopifyCustomers(
    brandId: string,
    query?: GetCustomersQuery,
): Promise<PaginatedCustomersResponse> {
    const qs = query ? toQueryString(query) : "";
    return apiRequest<PaginatedCustomersResponse>(`shopify/${brandId}/customers${qs}`, {
        method: "GET",
        auth: true,
    });
}

// ═══════════════════════════════════════════
// Refunds
// ═══════════════════════════════════════════

/** Shopify qaytarishlarni olish (pagination + filter) */
export async function getShopifyRefunds(
    brandId: string,
    query?: GetRefundsQuery,
): Promise<PaginatedRefundsResponse> {
    const qs = query ? toQueryString(query) : "";
    return apiRequest<PaginatedRefundsResponse>(`shopify/${brandId}/refunds${qs}`, {
        method: "GET",
        auth: true,
    });
}

// ═══════════════════════════════════════════
// Checkouts
// ═══════════════════════════════════════════

/** Shopify checkoutlarni olish (pagination + filter) */
export async function getShopifyCheckouts(
    brandId: string,
    query?: GetCheckoutsQuery,
): Promise<PaginatedCheckoutsResponse> {
    const qs = query ? toQueryString(query) : "";
    return apiRequest<PaginatedCheckoutsResponse>(`shopify/${brandId}/checkouts${qs}`, {
        method: "GET",
        auth: true,
    });
}

// ═══════════════════════════════════════════
// Integrations
// ═══════════════════════════════════════════

/** Barcha integratsiyalar holatini olish */
export async function getIntegrationsStatus(brandId: string): Promise<AllIntegrationsResponse> {
    return apiRequest<AllIntegrationsResponse>(`integrations/status/${brandId}`, {
        method: "GET",
        auth: true,
    });
}
