// ═══════════════════════════════════════════
// Engine115 - Shared Types
// Used by both frontend and backend
// ═══════════════════════════════════════════

// ── Core Enums ──

export type PlanTier = "free" | "pro" | "agency";
export type DatePreset = "7d" | "14d" | "30d" | "90d" | "custom";
export type PageId = "dashboard" | "pnl" | "creatives" | "ltv" | "account";
export type AdType = "Video" | "Static";
export type SortOrder = "asc" | "desc";

// ── Navigation ──

export interface NavItem {
  id: PageId;
  label: string;
  icon: string;
  pro?: boolean;
}

// ── Store / Connection ──

export interface ConnectedStore {
  id: string;
  name: string;
  platform: "shopify" | "amazon";
  connected: boolean;
  lastSync?: string; // ISO date
}

export interface DataSource {
  platform: "shopify" | "meta" | "google" | "tiktok" | "klaviyo";
  connected: boolean;
  lastSync?: string;
}

// ── Metrics ──

export interface MetricValue {
  label: string;
  value: string;
  change?: string; // e.g. "+12.4%" or "-5.2%"
  sparkData?: number[];
  sparkColor?: string;
  icon?: string;
  pinned?: boolean;
  locked?: boolean;
}

export interface ChannelMetrics {
  channel: "shopify" | "meta" | "google" | "tiktok" | "blended";
  metrics: MetricValue[];
}

// ── P&L ──

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  img: string; // thumbnail identifier
  shopifyProductId?: string;
}

export interface ProductCOGS extends Product {
  cogs: number; // per unit
  shippingCost: number; // per unit
}

export interface ProductPnL extends ProductCOGS {
  units: number;
  revenue: number;
  totalCogs: number; // cogs * units
  totalShipping: number; // shippingCost * units
  adCost: number; // proportionally allocated
  profit: number;
  margin: number; // percentage
}

export interface PnLSummary {
  totalRevenue: number;
  netProfit: number;
  netMargin: number;
  totalAdSpend: number;
}

// ── Creative Analysis ──

export interface CreativeThumb {
  bg: string; // gradient background color
  text: string; // overlay text
}

export interface Creative {
  id: number;
  name: string;
  type: AdType;
  campaign: string;
  adSet: string;
  spend: number;
  roas: number;
  cpa: number;
  ctr: number;
  // Video-only metrics (null for Static)
  thumbStop: number | null;
  avgPlay: number | null;
  holdRate: number | null;
  // UI
  thumb: CreativeThumb;
  // Computed
  rankInAdSet?: number;
  totalInAdSet?: number;
}

export interface CreativeFilters {
  campaign: string; // "all" or campaign name
  adSet: string; // "all" or ad set name
  searchAd: string; // free text
}

// ── LTV Cohorts ──

export interface LtvSummary {
  day30: MetricValue;
  day90: MetricValue;
  day365: MetricValue;
  repeatPurchaseRate: MetricValue;
}

export interface LtvCohortBar {
  period: string; // e.g. "30 Day"
  value: string; // e.g. "$42"
  percentage: number; // 0-100 for bar width
  customers: number;
}

export interface LtvMonthCohort {
  month: string; // e.g. "Jan 2026"
  customers: number;
  d30: string;
  d60: string;
  d90: string;
  d120: string;
  d180: string;
  d365: string;
}

export interface ProductLtv {
  name: string;
  sku: string;
  img: string;
  customers: number;
  d30: string;
  d60: string;
  d90: string;
  repeatRate: string;
  avgOrders: string;
  repeatColor: string; // hex color
}

export interface LtvDriver {
  name: string;
  ltv: string;
  impact: string; // e.g. "+66%" or "-30%"
  color: string; // hex color
}

export interface LtvDriversGroup {
  label: string;
  icon: string;
  iconColor: string;
  drivers: LtvDriver[];
}

// ── Date Range ──

export interface DateRange {
  preset: DatePreset;
  from?: string; // ISO date for custom
  to?: string; // ISO date for custom
  label: string; // display string e.g. "Feb 1 - Feb 14, 2026"
}

// ── API Response Wrappers ──

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface DashboardData {
  favorites: MetricValue[];
  channels: ChannelMetrics[];
}

export interface PnLData {
  products: Product[];
  cogsConfigured: boolean;
  productsPnL?: ProductPnL[];
  summary?: PnLSummary;
}

export interface CreativesData {
  creatives: Creative[];
  campaigns: string[];
  adSets: string[];
  isDemo: boolean; // true if user is on free tier (show sample data)
}

export interface LtvData {
  summary: LtvSummary;
  cohortBars: LtvCohortBar[];
  monthlyCohorts: LtvMonthCohort[];
  productLtv: ProductLtv[];
  drivers: LtvDriversGroup[];
  isDemo: boolean;
}
