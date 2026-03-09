import React from "react";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { T } from "../../libs/theme/theme";
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
        <div className="ltv-page">
            {/* Demo Banner */}
            {isDemo && <DemoBanner feature="LTV Cohorts" />}

            {/* Header */}
            <div className="page-header">
                <Ico type="layers" size={22} color={T.accent} />
                <span className="page-title">LTV Cohorts</span>
                {isDemo && (
                    <div className="demo-badge">
                        <span>EXAMPLE DATA</span>
                    </div>
                )}
            </div>
            <p className="page-subtitle">
                Track how much customers are worth over time after their first purchase.
            </p>

            {/* Summary Cards */}
            <div className="summary-grid">
                <MetricCard label="30-Day LTV" value="$42" change="+6.2%" sparkData={spkUp} sparkColor={T.accent} icon="dollar" />
                <MetricCard label="90-Day LTV" value="$89" change="+12.1%" sparkData={spkUp} sparkColor={T.green} icon="dollar" />
                <MetricCard label="365-Day LTV" value="$152" change="+18.4%" sparkData={spkUp} sparkColor={T.blue} icon="dollar" />
                <MetricCard label="Repeat Purchase Rate" value="34.2%" change="+3.8%" sparkData={spkUp} sparkColor={T.purple} icon="users" />
            </div>

            {/* Cohort Bars */}
            <div className="ltv-section">
                <SectionHead icon="chart" label="Customer Value Over Time" />
                <div className="cohort-bars-card">
                    {LTV_COHORT_BARS.map((row, i) => (
                        <div
                            key={i}
                            className="cohort-bar-row"
                            style={{ borderBottom: i < LTV_COHORT_BARS.length - 1 ? `1px solid ${T.border}` : "none" }}
                        >
                            <span className="period-label">{row.period}</span>
                            <div className="bar-track">
                                <div className="bar-fill" style={{ width: `${row.percentage}%` }} />
                            </div>
                            <span className="bar-value">{row.value}</span>
                            <span className="bar-customers">{row.customers.toLocaleString()} customers</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Monthly Cohort Table */}
            <div className="ltv-section">
                <SectionHead icon="grid" label="Monthly Cohort Breakdown" />
                <div className="cohort-table">
                    <div className="table-header" style={{ gridTemplateColumns: "1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr" }}>
                        {["Cohort", "Customers", "30D", "60D", "90D", "120D", "180D", "365D"].map((h) => (
                            <span key={h} className="header-cell">{h}</span>
                        ))}
                    </div>
                    {LTV_MONTHLY_COHORTS.map((row, i) => (
                        <div key={i} className="table-row" style={{ gridTemplateColumns: "1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr" }}>
                            <span className="cell-label">{row.month}</span>
                            <span className="cell-customers">{row.customers}</span>
                            {[row.d30, row.d60, row.d90, row.d120, row.d180, row.d365].map((v, j) => (
                                <span key={j} className={v === "--" ? "cell-empty" : "cell-value"}>{v}</span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* LTV by First Product */}
            <div className="ltv-section">
                <SectionHead
                    icon="box"
                    label="LTV by First Product Purchased"
                    right={<span style={{ fontSize: 10, color: T.dim, fontFamily: "monospace" }}>Sorted by 90-Day LTV</span>}
                />
                <p className="ltv-section-subtitle">
                    Which product a customer buys first and how much they end up spending over time.
                </p>
                <div className="product-ltv-table">
                    <div className="table-header" style={{ gridTemplateColumns: "0.3fr 2fr 0.7fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr" }}>
                        {["", "First Product", "Customers", "30D LTV", "60D LTV", "90D LTV", "Repeat %", "Avg Orders"].map((h) => (
                            <span key={h} className="header-cell">{h}</span>
                        ))}
                    </div>
                    {LTV_PRODUCT_DATA.map((p, i) => (
                        <div key={i} className="table-row" style={{ gridTemplateColumns: "0.3fr 2fr 0.7fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr" }}>
                            <div className="product-thumb">{p.img}</div>
                            <div>
                                <div className="product-name">{p.name}</div>
                                <div className="product-sku">{p.sku}</div>
                            </div>
                            <span className="cell-mono cell-muted">{p.customers}</span>
                            <span className="cell-mono cell-text">{p.d30}</span>
                            <span className="cell-mono cell-text">{p.d60}</span>
                            <span className="cell-mono cell-accent">{p.d90}</span>
                            <span className="cell-mono" style={{ color: p.repeatColor, fontWeight: 600 }}>{p.repeatRate}</span>
                            <span className="cell-mono cell-muted">{p.avgOrders}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* LTV Drivers */}
            <div className="ltv-section">
                <SectionHead
                    icon="zap"
                    label="LTV Drivers"
                    right={<span style={{ fontSize: 10, color: T.dim, fontFamily: "monospace" }}>What correlates with higher LTV</span>}
                />
                <p className="ltv-section-subtitle">
                    Products, discount codes, and acquisition sources ranked by their correlation with customer lifetime value.
                </p>
                <div className="drivers-grid">
                    {LTV_DRIVERS.map((group) => (
                        <div key={group.label} className="driver-card">
                            <div className="driver-header">
                                <Ico type={group.icon} size={14} color={group.iconColor} />
                                <span className="driver-title">{group.label}</span>
                            </div>
                            {group.drivers.map((d, i) => (
                                <div
                                    key={i}
                                    className="driver-row"
                                    style={{ borderBottom: i < group.drivers.length - 1 ? `1px solid ${T.border}` : "none" }}
                                >
                                    <div className="driver-left">
                                        <span
                                            className="rank-badge"
                                            style={{ background: `${d.color}15`, color: d.color }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span className="driver-name">{d.name}</span>
                                    </div>
                                    <div className="driver-right">
                                        <span className="driver-ltv">{d.ltv}</span>
                                        <span className="driver-impact" style={{ color: d.color }}>{d.impact}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            {isDemo && (
                <UpgradeCta
                    title="See your real customer LTV data"
                    description="Upgrade to Pro and Engine115 will calculate real LTV cohorts, product-level lifetime value, and LTV drivers from your actual Shopify customer data."
                />
            )}

            {isDemo && <SampleWatermark />}
        </div>
    );
};

export default withLayoutBasic(LtvPage);
