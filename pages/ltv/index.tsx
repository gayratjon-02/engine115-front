import React from "react";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { T, fonts } from "../../libs/theme/theme";
import { MetricCard } from "../../libs/components/common/MetricCard";
import { SectionHead, DemoBanner, SampleWatermark, UpgradeCta } from "../../libs/components/common/Shared";
import { Ico } from "../../libs/components/common/Ico";
import {
    spkUp,
    LTV_COHORT_BARS,
    LTV_MONTHLY_COHORTS,
    LTV_PRODUCT_DATA,
    LTV_DRIVERS,
} from "../../libs/data/mockData";
import type { LtvDriversGroup, ProductLtv } from "../../libs/types";

interface LtvPageProps {
    isDemo?: boolean;
}

const LtvPage: React.FC<LtvPageProps> = ({ isDemo = true }) => {
    return (
        <>
            {/* Demo Banner */}
            {isDemo && <DemoBanner feature="LTV Cohorts" />}

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <Ico type="layers" size={22} color={T.accent} />
                <span style={{ fontSize: 20, fontWeight: 700 }}>LTV Cohorts</span>
                {isDemo && (
                    <div
                        style={{
                            padding: "3px 8px",
                            borderRadius: 4,
                            background: `${T.yellow}20`,
                            border: `1px solid ${T.yellow}30`,
                        }}
                    >
                        <span style={{ fontSize: 9, fontWeight: 700, fontFamily: fonts.mono, color: T.yellow }}>
                            EXAMPLE DATA
                        </span>
                    </div>
                )}
            </div>
            <p style={{ fontSize: 13, color: T.muted, marginBottom: 24, marginTop: 0 }}>
                Track how much customers are worth over time after their first purchase.
            </p>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
                <MetricCard label="30-Day LTV" value="$42" change="+6.2%" sparkData={spkUp} sparkColor={T.accent} icon="dollar" />
                <MetricCard label="90-Day LTV" value="$89" change="+12.1%" sparkData={spkUp} sparkColor={T.green} icon="dollar" />
                <MetricCard label="365-Day LTV" value="$152" change="+18.4%" sparkData={spkUp} sparkColor={T.blue} icon="dollar" />
                <MetricCard label="Repeat Purchase Rate" value="34.2%" change="+3.8%" sparkData={spkUp} sparkColor={T.purple} icon="users" />
            </div>

            {/* ── Cohort Bars ── */}
            <CohortBars />

            {/* ── Monthly Cohort Table ── */}
            <MonthlyCohortTable />

            {/* ── LTV by First Product ── */}
            <ProductLtvTable />

            {/* ── LTV Drivers ── */}
            <LtvDriversSection />

            {/* Bottom CTA */}
            {isDemo && (
                <UpgradeCta
                    title="See your real customer LTV data"
                    description="Upgrade to Pro and Engine115 will calculate real LTV cohorts, product-level lifetime value, and LTV drivers from your actual Shopify customer data."
                />
            )}

            {isDemo && <SampleWatermark />}
        </>
    );
};

// ── Sub-sections (each maps to its own API endpoint) ──

const CohortBars: React.FC = () => (
    <div style={{ marginBottom: 24 }}>
        <SectionHead icon="chart" label="Customer Value Over Time" />
        <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24 }}>
            {LTV_COHORT_BARS.map((row, i) => (
                <div
                    key={i}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "12px 0",
                        borderBottom: i < LTV_COHORT_BARS.length - 1 ? `1px solid ${T.border}` : "none",
                    }}
                >
                    <span style={{ width: 70, fontSize: 12, fontWeight: 600, fontFamily: fonts.mono, color: T.muted }}>
                        {row.period}
                    </span>
                    <div
                        style={{
                            flex: 1,
                            height: 28,
                            background: T.bgInput,
                            borderRadius: 6,
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: `${row.percentage}%`,
                                height: "100%",
                                background: T.grad,
                                borderRadius: 6,
                                transition: "width 0.5s",
                            }}
                        />
                    </div>
                    <span
                        style={{
                            width: 55,
                            fontSize: 14,
                            fontWeight: 700,
                            fontFamily: fonts.mono,
                            color: T.text,
                            textAlign: "right",
                        }}
                    >
                        {row.value}
                    </span>
                    <span
                        style={{
                            width: 90,
                            fontSize: 10,
                            fontFamily: fonts.mono,
                            color: T.dim,
                            textAlign: "right",
                        }}
                    >
                        {row.customers.toLocaleString()} customers
                    </span>
                </div>
            ))}
        </div>
    </div>
);

const MonthlyCohortTable: React.FC = () => (
    <div style={{ marginBottom: 24 }}>
        <SectionHead icon="grid" label="Monthly Cohort Breakdown" />
        <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr",
                    gap: 4,
                    padding: "12px 16px",
                    borderBottom: `1px solid ${T.border}`,
                    background: T.bgInput,
                }}
            >
                {["Cohort", "Customers", "30D", "60D", "90D", "120D", "180D", "365D"].map((h) => (
                    <span key={h} style={{ fontSize: 10, fontWeight: 600, color: T.dim, fontFamily: fonts.mono }}>
                        {h}
                    </span>
                ))}
            </div>
            {LTV_MONTHLY_COHORTS.map((row, i) => (
                <div
                    key={i}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr",
                        gap: 4,
                        padding: "10px 16px",
                        borderBottom: `1px solid ${T.border}`,
                        alignItems: "center",
                    }}
                >
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{row.month}</span>
                    <span style={{ fontSize: 11, fontFamily: fonts.mono, color: T.muted }}>{row.customers}</span>
                    {[row.d30, row.d60, row.d90, row.d120, row.d180, row.d365].map((v, j) => (
                        <span
                            key={j}
                            style={{
                                fontSize: 11,
                                fontFamily: fonts.mono,
                                fontWeight: 600,
                                color: v === "--" ? T.dim : T.accent,
                            }}
                        >
                            {v}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

const ProductLtvTable: React.FC = () => (
    <div style={{ marginBottom: 24 }}>
        <SectionHead
            icon="box"
            label="LTV by First Product Purchased"
            right={<span style={{ fontSize: 10, color: T.dim, fontFamily: fonts.mono }}>Sorted by 90-Day LTV</span>}
        />
        <p style={{ fontSize: 11, color: T.muted, marginTop: -8, marginBottom: 14 }}>
            Which product a customer buys first and how much they end up spending over time.
        </p>
        <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "0.3fr 2fr 0.7fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr",
                    gap: 4,
                    padding: "12px 16px",
                    borderBottom: `1px solid ${T.border}`,
                    background: T.bgInput,
                }}
            >
                {["", "First Product", "Customers", "30D LTV", "60D LTV", "90D LTV", "Repeat %", "Avg Orders"].map((h) => (
                    <span key={h} style={{ fontSize: 9, fontWeight: 600, color: T.dim, fontFamily: fonts.mono }}>
                        {h}
                    </span>
                ))}
            </div>
            {LTV_PRODUCT_DATA.map((p, i) => (
                <div
                    key={i}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "0.3fr 2fr 0.7fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr",
                        gap: 4,
                        padding: "10px 16px",
                        borderBottom: `1px solid ${T.border}`,
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: 26,
                            height: 26,
                            borderRadius: 5,
                            background: `${T.accent}12`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 8,
                            fontWeight: 700,
                            fontFamily: fonts.mono,
                            color: T.accent,
                        }}
                    >
                        {p.img}
                    </div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 9, fontFamily: fonts.mono, color: T.dim }}>{p.sku}</div>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: fonts.mono, color: T.muted }}>{p.customers}</span>
                    <span style={{ fontSize: 11, fontFamily: fonts.mono, fontWeight: 600, color: T.text }}>{p.d30}</span>
                    <span style={{ fontSize: 11, fontFamily: fonts.mono, fontWeight: 600, color: T.text }}>{p.d60}</span>
                    <span style={{ fontSize: 11, fontFamily: fonts.mono, fontWeight: 700, color: T.accent }}>{p.d90}</span>
                    <span style={{ fontSize: 11, fontFamily: fonts.mono, fontWeight: 600, color: p.repeatColor }}>
                        {p.repeatRate}
                    </span>
                    <span style={{ fontSize: 11, fontFamily: fonts.mono, color: T.muted }}>{p.avgOrders}</span>
                </div>
            ))}
        </div>
    </div>
);

const LtvDriversSection: React.FC = () => (
    <div style={{ marginBottom: 24 }}>
        <SectionHead
            icon="zap"
            label="LTV Drivers"
            right={
                <span style={{ fontSize: 10, color: T.dim, fontFamily: fonts.mono }}>
                    What correlates with higher LTV
                </span>
            }
        />
        <p style={{ fontSize: 11, color: T.muted, marginTop: -8, marginBottom: 14 }}>
            Products, discount codes, and acquisition sources ranked by their correlation with customer lifetime value.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {LTV_DRIVERS.map((group) => (
                <div
                    key={group.label}
                    style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                        <Ico type={group.icon} size={14} color={group.iconColor} />
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{group.label}</span>
                    </div>
                    {group.drivers.map((d, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "8px 0",
                                borderBottom: i < group.drivers.length - 1 ? `1px solid ${T.border}` : "none",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span
                                    style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: 4,
                                        background: `${d.color}15`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 10,
                                        fontWeight: 800,
                                        fontFamily: fonts.mono,
                                        color: d.color,
                                    }}
                                >
                                    {i + 1}
                                </span>
                                <span style={{ fontSize: 11, fontWeight: 500 }}>{d.name}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 11, fontFamily: fonts.mono, fontWeight: 600 }}>{d.ltv}</span>
                                <span style={{ fontSize: 10, fontFamily: fonts.mono, fontWeight: 600, color: d.color }}>
                                    {d.impact}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default withLayoutBasic(LtvPage);
