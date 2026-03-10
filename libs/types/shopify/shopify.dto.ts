import type {
    PRODUCT_STATUS,
    CHECKOUT_STATUS,
    REFUND_REASON,
    PLATFORM,
    CONNECTION_STATUS,
} from '../../enums/shopify.enum';

// ═══════════════════════════════════════════
// Pagination
// ═══════════════════════════════════════════

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// ═══════════════════════════════════════════
// Products
// ═══════════════════════════════════════════

export interface GetProductsQuery {
    search?: string;
    status?: PRODUCT_STATUS;
    page?: number;
    limit?: number;
}

export interface ProductResponse {
    id: string;
    shopifyProductId: number;
    title: string;
    productType: string | null;
    vendor: string | null;
    imageUrl: string | null;
    price: number | null;
    sku: string | null;
    status: string;
    cogs: number | null;
    shippingCost: number | null;
    createdAt: string;
}

export interface PaginatedProductsResponse {
    data: ProductResponse[];
    meta: PaginationMeta;
}

// ═══════════════════════════════════════════
// Orders
// ═══════════════════════════════════════════

export interface GetOrdersQuery {
    startDate?: string;
    endDate?: string;
    financialStatus?: string;
    isNewCustomer?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: 'orderDate' | 'totalPrice' | 'orderNumber';
    sortOrder?: 'ASC' | 'DESC';
}

export interface OrderResponse {
    id: string;
    shopifyOrderId: number;
    orderNumber: string;
    customerEmail: string | null;
    totalPrice: number;
    subtotalPrice: number;
    totalDiscounts: number;
    totalShipping: number;
    financialStatus: string;
    fulfillmentStatus: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    isNewCustomer: boolean;
    hasDiscount: boolean;
    discountCodes: string | null;
    orderDate: string;
}

export interface OrdersSummary {
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    newCustomers: number;
    returningCustomers: number;
}

export interface PaginatedOrdersResponse {
    data: OrderResponse[];
    summary: OrdersSummary;
    meta: PaginationMeta;
}

// ═══════════════════════════════════════════
// Customers
// ═══════════════════════════════════════════

export interface GetCustomersQuery {
    search?: string;
    minOrders?: number;
    sortBy?: 'totalSpent' | 'totalOrders' | 'firstOrderDate' | 'lastOrderDate';
    sortOrder?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
}

export interface CustomerResponse {
    id: string;
    shopifyCustomerId: number;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    firstOrderDate: string;
    firstProductId: number | null;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string | null;
}

export interface CustomersSummary {
    totalCustomers: number;
    newCustomers: number;
    returningCustomers: number;
    avgLtv: number;
}

export interface PaginatedCustomersResponse {
    data: CustomerResponse[];
    summary: CustomersSummary;
    meta: PaginationMeta;
}

// ═══════════════════════════════════════════
// Refunds
// ═══════════════════════════════════════════

export interface GetRefundsQuery {
    startDate?: string;
    endDate?: string;
    reason?: REFUND_REASON;
    page?: number;
    limit?: number;
}

export interface RefundLineItem {
    productId: number;
    quantity: number;
    amount: number;
}

export interface RefundResponse {
    id: string;
    shopifyRefundId: number;
    orderNumber: string | null;
    customerEmail: string | null;
    amount: number;
    reason: string | null;
    note: string | null;
    refundDate: string;
    refundLineItems: RefundLineItem[] | null;
    createdAt: string;
}

export interface RefundsSummary {
    totalRefunds: number;
    refundCount: number;
    avgRefundAmount: number;
}

export interface PaginatedRefundsResponse {
    data: RefundResponse[];
    summary: RefundsSummary;
    meta: PaginationMeta;
}

// ═══════════════════════════════════════════
// Checkouts
// ═══════════════════════════════════════════

export interface GetCheckoutsQuery {
    startDate?: string;
    endDate?: string;
    status?: CHECKOUT_STATUS;
    page?: number;
    limit?: number;
}

export interface CheckoutResponse {
    id: string;
    shopifyCheckoutId: number;
    customerEmail: string | null;
    totalPrice: number;
    status: string;
    checkoutDate: string;
    completedAt: string | null;
}

export interface CheckoutsSummary {
    totalCheckouts: number;
    completedCheckouts: number;
    abandonedCheckouts: number;
    abandonmentRate: number;
    abandonedRevenue: number;
}

export interface PaginatedCheckoutsResponse {
    data: CheckoutResponse[];
    summary: CheckoutsSummary;
    meta: PaginationMeta;
}

// ═══════════════════════════════════════════
// Sync
// ═══════════════════════════════════════════

export interface SyncResourceResult {
    synced: number;
    created: number;
    updated: number;
    errors: number;
}

export interface SyncResponse {
    status: 'completed' | 'failed';
    syncedAt: string;
    results: Record<string, SyncResourceResult>;
    duration: number;
}

export interface SyncStatusResponse {
    connected: boolean;
    platform: 'shopify';
    shopDomain: string | null;
    status: CONNECTION_STATUS;
    lastSyncedAt: string | null;
    lastSyncError: string | null;
    counts: {
        orders: number;
        customers: number;
        products: number;
        refunds: number;
        checkouts: number;
    } | null;
}

// ═══════════════════════════════════════════
// Integrations
// ═══════════════════════════════════════════

export interface IntegrationStatusResponse {
    platform: PLATFORM;
    status: CONNECTION_STATUS;
    externalAccountName: string | null;
    shopDomain: string | null;
    adAccountId: string | null;
    lastSyncedAt: string | null;
    lastSyncError: string | null;
    connectedAt: string;
}

export interface AllIntegrationsResponse {
    connectedCount: number;
    integrations: IntegrationStatusResponse[];
}

export interface ConnectPlatformDto {
    platform: PLATFORM;
    accessToken: string;
    refreshToken?: string;
    shopDomain?: string;
    adAccountId?: string;
    externalAccountName?: string;
}

export interface DisconnectPlatformDto {
    platform: PLATFORM;
}
