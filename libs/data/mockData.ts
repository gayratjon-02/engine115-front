import { T, generateSparkData } from "../theme/theme";
import type {
  Product,
  ProductPnL,
  Creative,
  MetricValue,
  ChannelMetrics,
  LtvCohortBar,
  LtvMonthCohort,
  ProductLtv,
  LtvDriversGroup,
  NavItem,
} from "../types";
import type { Integration } from "../components/integrations/IntegrationsSection";

// ── Sparkline Presets ──

export const spkUp = generateSparkData(60, 15);
export const spkDown = generateSparkData(80, 12).reverse();
export const spkFlat = generateSparkData(50, 5);
export const spkVol = generateSparkData(45, 25);

// ── Navigation ──

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "pnl", label: "P&L", icon: "dollar" },
  { id: "creatives", label: "AI Creative Analysis", icon: "brain", pro: true },
  { id: "ltv", label: "LTV Cohorts", icon: "layers", pro: true },
  { id: "integrations", label: "Integrations", icon: "zap" },
];

// ── P&L Products (before COGS entry) ──

export const PRODUCTS_INIT: Product[] = [
  { id: 1, name: "Static Engine - Starter", sku: "SE-START", price: 34.0, img: "CS" },
  { id: 2, name: "Static Engine - Growth", sku: "SE-GROW", price: 34.0, img: "CS" },
  { id: 3, name: "Static Engine - Scale", sku: "SE-SCALE", price: 34.0, img: "CS" },
  { id: 4, name: "Static Engine - Solo", sku: "SE-SOLO", price: 18.0, img: "DE" },
  { id: 5, name: "Static Engine - Team", sku: "SE-TEAM", price: 18.0, img: "DE" },
  { id: 6, name: "Static Engine - Agency Bundle", sku: "SE-AGCY", price: 54.0, img: "KT" },
  { id: 7, name: "Static Engine - Trial", sku: "SE-TRIAL", price: 22.0, img: "CS" },
  { id: 8, name: "Static Engine - Duo Pack", sku: "SE-DUO", price: 32.0, img: "DE" },
];

// ── P&L Products (after COGS entry, with sales data) ──

export const PRODUCTS_FILLED: (Product & {
  cogs: number;
  shipping: number;
  units: number;
  revenue: number;
})[] = [
  { id: 1, name: "Static Engine - Starter", sku: "SE-START", price: 34, cogs: 6.8, shipping: 4.2, units: 312, revenue: 10608, img: "CS" },
  { id: 2, name: "Static Engine - Growth", sku: "SE-GROW", price: 34, cogs: 6.8, shipping: 4.2, units: 287, revenue: 9758, img: "CS" },
  { id: 3, name: "Static Engine - Scale", sku: "SE-SCALE", price: 34, cogs: 6.8, shipping: 4.2, units: 198, revenue: 6732, img: "CS" },
  { id: 4, name: "Static Engine - Solo", sku: "SE-SOLO", price: 18, cogs: 3.2, shipping: 3.8, units: 445, revenue: 8010, img: "DE" },
  { id: 5, name: "Static Engine - Team", sku: "SE-TEAM", price: 18, cogs: 3.2, shipping: 3.8, units: 389, revenue: 7002, img: "DE" },
  { id: 6, name: "Static Engine - Agency Bundle", sku: "SE-AGCY", price: 54, cogs: 11.4, shipping: 5.5, units: 156, revenue: 8424, img: "KT" },
  { id: 7, name: "Static Engine - Trial", sku: "SE-TRIAL", price: 22, cogs: 4.2, shipping: 3.5, units: 134, revenue: 2948, img: "CS" },
  { id: 8, name: "Static Engine - Duo Pack", sku: "SE-DUO", price: 32, cogs: 6.4, shipping: 4.5, units: 201, revenue: 6432, img: "DE" },
];

export const TOTAL_AD_SPEND = 31830;

// ── Dashboard: Channel Metrics ──

export const DASHBOARD_FAVORITES: MetricValue[] = [
  { label: "Total Sales", value: "$98,350", change: "-37.34%", sparkData: spkDown, sparkColor: T.accent, icon: "dollar", pinned: true },
  { label: "True AOV", value: "$53.20", change: "-6.56%", sparkData: spkFlat, sparkColor: T.blue, icon: "layers", pinned: true },
  { label: "ROAS", value: "3.09x", change: "+72.41%", sparkData: spkUp, sparkColor: T.green, icon: "chart", pinned: true },
];

export const DASHBOARD_CHANNELS: ChannelMetrics[] = [
  {
    channel: "shopify",
    metrics: [
      { label: "Gross Sales", value: "$98,350", change: "-37.34%", sparkData: spkDown, sparkColor: T.accent, icon: "dollar" },
      { label: "Refunds", value: "$2,140", change: "+12.1%", sparkData: spkUp, sparkColor: T.red, icon: "dollar" },
      { label: "Discount Codes Used", value: "342", change: "-8.2%", sparkData: spkDown, sparkColor: T.orange, icon: "grid" },
      { label: "Returning Customer Rate", value: "28.4%", change: "+3.1%", sparkData: spkUp, sparkColor: T.green, icon: "users" },
      { label: "Cart Abandonment Rate", value: "71.2%", change: "-2.4%", sparkData: spkDown, sparkColor: T.yellow, icon: "chart" },
      { label: "Avg Units Per Order", value: "1.8", change: "+0.2%", sparkData: spkFlat, sparkColor: T.blue, icon: "layers" },
    ],
  },
  {
    channel: "meta",
    metrics: [
      { label: "Spend", value: "$24,680", change: "-18.2%", sparkData: spkDown, sparkColor: T.blue, icon: "dollar" },
      { label: "ROAS", value: "3.42x", change: "+14.8%", sparkData: spkUp, sparkColor: T.green, icon: "chart" },
      { label: "CPA", value: "$18.40", change: "-8.6%", sparkData: spkDown, sparkColor: T.accent, icon: "dollar" },
      { label: "CPM", value: "$22.80", change: "+5.1%", sparkData: spkUp, sparkColor: T.orange, icon: "dollar" },
      { label: "CPC", value: "$1.06", change: "-3.2%", sparkData: spkDown, sparkColor: T.accent, icon: "dollar" },
      { label: "CTR", value: "2.14%", change: "+0.3%", sparkData: spkUp, sparkColor: T.accent, icon: "chart" },
      { label: "Purchases", value: "1,341", change: "-22.4%", sparkData: spkDown, sparkColor: T.purple, icon: "grid" },
    ],
  },
  {
    channel: "google",
    metrics: [
      { label: "Spend", value: "$5,420", change: "-24.6%", sparkData: spkDown, sparkColor: T.blue, icon: "dollar" },
      { label: "ROAS", value: "2.81x", change: "+9.2%", sparkData: spkUp, sparkColor: T.green, icon: "chart" },
      { label: "CPA", value: "$28.60", change: "-4.1%", sparkData: spkDown, sparkColor: T.accent, icon: "dollar" },
      { label: "Impressions", value: "412K", change: "-15.8%", sparkData: spkDown, sparkColor: T.muted, icon: "grid" },
      { label: "CTR", value: "3.82%", change: "+0.6%", sparkData: spkUp, sparkColor: T.accent, icon: "chart" },
      { label: "Conversions", value: "189", change: "-18.3%", sparkData: spkDown, sparkColor: T.purple, icon: "grid" },
    ],
  },
  {
    channel: "tiktok",
    metrics: [
      { label: "Spend", value: "$1,730", change: "+42.1%", sparkData: spkUp, sparkColor: T.blue, icon: "dollar" },
      { label: "ROAS", value: "1.94x", change: "+28.4%", sparkData: spkUp, sparkColor: T.green, icon: "chart" },
      { label: "CPA", value: "$34.20", change: "-11.2%", sparkData: spkDown, sparkColor: T.accent, icon: "dollar" },
      { label: "Video Views", value: "284K", change: "+68.4%", sparkData: spkUp, sparkColor: T.pink, icon: "play" },
      { label: "CTR", value: "1.42%", change: "+0.4%", sparkData: spkUp, sparkColor: T.accent, icon: "chart" },
      { label: "Conversions", value: "51", change: "+32.1%", sparkData: spkUp, sparkColor: T.purple, icon: "grid" },
    ],
  },
  {
    channel: "blended",
    metrics: [
      { label: "Total Ad Spend", value: "$31,830", change: "-14.8%", sparkData: spkDown, sparkColor: T.red, icon: "dollar" },
      { label: "Blended ROAS (MER)", value: "3.09x", change: "+12.6%", sparkData: spkUp, sparkColor: T.green, icon: "chart" },
      { label: "Blended CPA", value: "$20.14", change: "-6.8%", sparkData: spkDown, sparkColor: T.accent, icon: "dollar" },
      { label: "New Customer CPA", value: "$24.80", change: "-5.2%", sparkData: spkDown, sparkColor: T.accent, icon: "users" },
      { label: "New Customer ROAS", value: "2.64x", change: "+8.4%", sparkData: spkUp, sparkColor: T.green, icon: "chart" },
    ],
  },
];

// ── Creative Analysis (Demo Data) ──

export const CREATIVES_DEMO: Creative[] = [
  { id: 1, name: "ad 3 - UGC testimonial - hook variation A", type: "Video", campaign: "Acme Co - TOF Broad", adSet: "Broad - 18-45 M", spend: 12840, roas: 5.12, cpa: 14.2, ctr: 3.41, thumbStop: 44, avgPlay: 15.8, holdRate: 51, thumb: { bg: "#2a1a3a", text: "I literally can't believe..." } },
  { id: 2, name: "ad 7 - before after - product demo", type: "Video", campaign: "Acme Co - TOF Broad", adSet: "Broad - 18-45 M", spend: 9420, roas: 4.21, cpa: 18.4, ctr: 2.84, thumbStop: 38, avgPlay: 12.4, holdRate: 42, thumb: { bg: "#1a2a3a", text: "Watch this transformation" } },
  { id: 3, name: "NP - feature pointers - product v2", type: "Static", campaign: "Acme Co - TOF Broad", adSet: "Broad - 25-55 M", spend: 8210, roas: 3.82, cpa: 22.1, ctr: 2.14, thumbStop: null, avgPlay: null, holdRate: null, thumb: { bg: "#1a3a2a", text: "5 reasons to switch" } },
  { id: 4, name: "ad 12 - problem agitate - why most fail", type: "Video", campaign: "Acme Co - TOF Broad", adSet: "Broad - 25-55 M", spend: 5120, roas: 3.64, cpa: 24.8, ctr: 1.92, thumbStop: 29, avgPlay: 8.2, holdRate: 31, thumb: { bg: "#3a2a1a", text: "Why most products fail" } },
  { id: 5, name: "stat callout - 94% of men - retarget", type: "Static", campaign: "Acme Co - Retarget", adSet: "Retarget 7d VC", spend: 3420, roas: 6.81, cpa: 12.4, ctr: 3.12, thumbStop: null, avgPlay: null, holdRate: null, thumb: { bg: "#2a2a1a", text: "94% of men don't know" } },
  { id: 6, name: "ad 9 - us vs them - natural vs chemical", type: "Static", campaign: "Acme Co - TOF Interest", adSet: "Interest - Grooming", spend: 5890, roas: 2.58, cpa: 31.5, ctr: 1.38, thumbStop: null, avgPlay: null, holdRate: null, thumb: { bg: "#1a1a3a", text: "Natural vs Chemical" } },
  { id: 7, name: "ad 15 - unboxing - starter kit full", type: "Video", campaign: "Acme Co - TOF Lookalike", adSet: "LAL Purchasers 1%", spend: 4210, roas: 3.41, cpa: 26.2, ctr: 2.08, thumbStop: 32, avgPlay: 18.4, holdRate: 38, thumb: { bg: "#2a3a2a", text: "Let me show you everything" } },
  { id: 8, name: "ad 2 - founder story - why I started Acme", type: "Video", campaign: "Acme Co - TOF Lookalike", adSet: "LAL Purchasers 1%", spend: 3740, roas: 3.18, cpa: 28.6, ctr: 1.74, thumbStop: 26, avgPlay: 22.1, holdRate: 35, thumb: { bg: "#3a1a2a", text: "Why I created Acme" } },
  { id: 9, name: "ad 18 - social proof - reviews montage", type: "Video", campaign: "Acme Co - Retarget", adSet: "Retarget 7d VC", spend: 2180, roas: 7.24, cpa: 10.8, ctr: 3.62, thumbStop: 41, avgPlay: 11.2, holdRate: 45, thumb: { bg: "#1a2a2a", text: "Don't just take my word" } },
  { id: 10, name: "ad 21 - lifestyle - gym morning routine", type: "Video", campaign: "Acme Co - TOF Interest", adSet: "Interest - Grooming", spend: 3640, roas: 2.94, cpa: 29.1, ctr: 1.56, thumbStop: 24, avgPlay: 9.8, holdRate: 28, thumb: { bg: "#2a1a2a", text: "My morning routine" } },
  { id: 11, name: "carousel - product lineup - all SKUs", type: "Static", campaign: "Acme Co - Retarget", adSet: "Retarget 14d ATC", spend: 1840, roas: 5.42, cpa: 15.6, ctr: 2.88, thumbStop: null, avgPlay: null, holdRate: null, thumb: { bg: "#1a3a3a", text: "The full Acme lineup" } },
  { id: 12, name: "ad 6 - ingredient spotlight - aluminum free", type: "Static", campaign: "Acme Co - TOF Interest", adSet: "Interest - Clean Beauty", spend: 2920, roas: 3.12, cpa: 27.4, ctr: 1.82, thumbStop: null, avgPlay: null, holdRate: null, thumb: { bg: "#2a2a3a", text: "What's really in yours?" } },
];

// ── LTV Cohorts (Demo Data) ──

export const LTV_COHORT_BARS: LtvCohortBar[] = [
  { period: "30 Day", value: "$42", percentage: 28, customers: 1847 },
  { period: "60 Day", value: "$67", percentage: 44, customers: 1523 },
  { period: "90 Day", value: "$89", percentage: 59, customers: 1284 },
  { period: "120 Day", value: "$108", percentage: 71, customers: 1041 },
  { period: "180 Day", value: "$135", percentage: 88, customers: 812 },
  { period: "365 Day", value: "$152", percentage: 100, customers: 534 },
];

export const LTV_MONTHLY_COHORTS: LtvMonthCohort[] = [
  { month: "Jan 2026", customers: 412, d30: "$38", d60: "$61", d90: "$84", d120: "$102", d180: "--", d365: "--" },
  { month: "Dec 2025", customers: 389, d30: "$41", d60: "$65", d90: "$88", d120: "$109", d180: "$128", d365: "--" },
  { month: "Nov 2025", customers: 445, d30: "$44", d60: "$69", d90: "$91", d120: "$112", d180: "$138", d365: "--" },
  { month: "Oct 2025", customers: 378, d30: "$40", d60: "$64", d90: "$86", d120: "$105", d180: "$131", d365: "--" },
  { month: "Sep 2025", customers: 356, d30: "$43", d60: "$68", d90: "$92", d120: "$111", d180: "$136", d365: "--" },
  { month: "Aug 2025", customers: 401, d30: "$39", d60: "$63", d90: "$85", d120: "$104", d180: "$130", d365: "--" },
];

export const LTV_PRODUCT_DATA: ProductLtv[] = [
  { name: "Acme Starter Kit", sku: "ACM-KIT", img: "KT", customers: 156, d30: "$72", d60: "$118", d90: "$148", repeatRate: "52.4%", avgOrders: "2.8", repeatColor: T.green },
  { name: "Acme Daily Serum", sku: "ACM-SRM", img: "CS", customers: 312, d30: "$48", d60: "$79", d90: "$104", repeatRate: "41.2%", avgOrders: "2.3", repeatColor: T.green },
  { name: "Acme Night Cream", sku: "ACM-NCR", img: "CS", customers: 287, d30: "$46", d60: "$74", d90: "$98", repeatRate: "38.6%", avgOrders: "2.1", repeatColor: T.yellow },
  { name: "Acme Eye Balm", sku: "ACM-EYE", img: "CS", customers: 198, d30: "$44", d60: "$71", d90: "$92", repeatRate: "36.1%", avgOrders: "2.0", repeatColor: T.yellow },
  { name: "Acme Duo Pack", sku: "ACM-DUO", img: "DE", customers: 201, d30: "$42", d60: "$68", d90: "$88", repeatRate: "34.8%", avgOrders: "1.9", repeatColor: T.yellow },
  { name: "Acme Cleanser", sku: "ACM-CLN", img: "DE", customers: 445, d30: "$28", d60: "$42", d90: "$54", repeatRate: "22.1%", avgOrders: "1.5", repeatColor: T.red },
  { name: "Acme Toner", sku: "ACM-TNR", img: "DE", customers: 389, d30: "$26", d60: "$39", d90: "$49", repeatRate: "19.8%", avgOrders: "1.4", repeatColor: T.red },
  { name: "Acme Travel Mini", sku: "ACM-TRV", img: "CS", customers: 134, d30: "$24", d60: "$35", d90: "$42", repeatRate: "16.4%", avgOrders: "1.3", repeatColor: T.red },
];

export const LTV_DRIVERS: LtvDriversGroup[] = [
  {
    label: "By Product",
    icon: "box",
    iconColor: T.accent,
    drivers: [
      { name: "Agency Bundle", ltv: "$148", impact: "+66%", color: T.green },
      { name: "Starter", ltv: "$104", impact: "+17%", color: T.green },
      { name: "Growth", ltv: "$98", impact: "+10%", color: T.accent },
      { name: "Solo", ltv: "$54", impact: "-39%", color: T.red },
      { name: "Trial", ltv: "$42", impact: "-53%", color: T.red },
    ],
  },
  {
    label: "By Discount Code",
    icon: "dollar",
    iconColor: T.purple,
    drivers: [
      { name: "No discount", ltv: "$112", impact: "+26%", color: T.green },
      { name: "WELCOME15", ltv: "$86", impact: "-3%", color: T.muted },
      { name: "BUNDLE20", ltv: "$124", impact: "+40%", color: T.green },
      { name: "BFCM40", ltv: "$62", impact: "-30%", color: T.red },
      { name: "FREESHIP", ltv: "$78", impact: "-12%", color: T.orange },
    ],
  },
  {
    label: "By Acquisition Source",
    icon: "chart",
    iconColor: T.orange,
    drivers: [
      { name: "Organic / Direct", ltv: "$118", impact: "+33%", color: T.green },
      { name: "Meta Ads", ltv: "$94", impact: "+6%", color: T.accent },
      { name: "Google Ads", ltv: "$82", impact: "-8%", color: T.orange },
      { name: "TikTok Ads", ltv: "$58", impact: "-35%", color: T.red },
      { name: "Email / Klaviyo", ltv: "$132", impact: "+48%", color: T.green },
    ],
  },
];

// ── Utility: Compute ad-set spend ranks ──

export function computeCreativeRanks(creatives: Creative[]): Creative[] {
  const groups: Record<string, Creative[]> = {};
  creatives.forEach((c) => {
    const key = `${c.campaign}|||${c.adSet}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });
  Object.values(groups).forEach((group) => {
    group.sort((a, b) => b.spend - a.spend);
    group.forEach((c, i) => {
      c.rankInAdSet = i + 1;
      c.totalInAdSet = group.length;
    });
  });
  return creatives;
}

// Auto-compute on import
computeCreativeRanks(CREATIVES_DEMO);

// ── Integrations ──

export const INTEGRATIONS_INIT: Integration[] = [
  { id: "shopify", name: "Shopify", icon: "box", description: "Sync orders, products, and customer data", connected: true, lastSync: "2 min ago" },
  { id: "meta", name: "Meta Ads", icon: "image", description: "Facebook & Instagram ad performance", connected: true, lastSync: "5 min ago" },
  { id: "google-ads", name: "Google Ads", icon: "google", description: "Search, display, and shopping campaigns", connected: true, lastSync: "8 min ago" },
  { id: "tiktok", name: "TikTok Ads", icon: "play", description: "TikTok ad spend and conversions", connected: false },
  { id: "klaviyo", name: "Klaviyo", icon: "mail", description: "Email & SMS marketing attribution", connected: false },
  { id: "google-analytics", name: "Google Analytics", icon: "chart", description: "Website traffic and behavior data", connected: false },
];
