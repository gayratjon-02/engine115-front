import React, { useState } from "react";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { T, fonts } from "../../libs/theme/theme";
import { MetricCard } from "../../libs/components/common/MetricCard";
import { SectionHead } from "../../libs/components/common/Shared";
import { Ico } from "../../libs/components/common/Ico";
import { PRODUCTS_INIT, PRODUCTS_FILLED, TOTAL_AD_SPEND, spkUp, spkDown } from "../../libs/data/mockData";

const PnLPage: React.FC = () => {
    const [cogsSetup, setCogsSetup] = useState(false);

    if (!cogsSetup) {
        // ── COGS Input Screen ──
        return (
            <div>
                <SectionHead
                    icon="dollar"
                    label="Product Costs"
                    right={
                        <span style={{ fontSize: 10, color: T.dim, fontFamily: fonts.mono }}>
                            {PRODUCTS_INIT.length} products synced from Shopify
                        </span>
                    }
                />
                <p style={{ fontSize: 13, color: T.muted, marginBottom: 18, marginTop: -4 }}>
                    Enter your COGS and shipping cost per unit to calculate true profitability.
                </p>

                <div
                    style={{
                        background: T.bgCard,
                        border: `1px solid ${T.border}`,
                        borderRadius: 12,
                        overflow: "hidden",
                    }}
                >
                    {/* Header Row */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "0.3fr 2fr 0.8fr 1fr 1fr",
                            gap: 10,
                            padding: "12px 16px",
                            borderBottom: `1px solid ${T.border}`,
                            background: T.bgInput,
                        }}
                    >
                        {["", "Product", "Price", "COGS / Unit", "Shipping / Unit"].map((h) => (
                            <span key={h} style={{ fontSize: 9, fontWeight: 600, color: T.dim, fontFamily: fonts.mono }}>
                                {h}
                            </span>
                        ))}
                    </div>

                    {/* Product Rows */}
                    {PRODUCTS_INIT.map((p) => (
                        <div
                            key={p.id}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "0.3fr 2fr 0.8fr 1fr 1fr",
                                gap: 10,
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
                            <span style={{ fontSize: 12, fontFamily: fonts.mono, fontWeight: 600 }}>${p.price.toFixed(2)}</span>
                            <CostInput />
                            <CostInput />
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
                    <button
                        style={{
                            padding: "9px 20px",
                            borderRadius: 7,
                            border: `1px solid ${T.border}`,
                            background: "transparent",
                            color: T.muted,
                            fontSize: 12,
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setCogsSetup(true)}
                        style={{
                            padding: "9px 28px",
                            borderRadius: 7,
                            border: "none",
                            background: T.grad,
                            color: "#000",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <Ico type="check" size={14} color="#000" /> Save Costs
                    </button>
                </div>
            </div>
        );
    }

    // ── P&L Results Screen ──
    const totalUnits = PRODUCTS_FILLED.reduce((s, p) => s + p.units, 0);

    return (
        <div>
            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                <MetricCard
                    label="Total Revenue"
                    value={`$${PRODUCTS_FILLED.reduce((s, p) => s + p.revenue, 0).toLocaleString()}`}
                    change="-37.34%"
                    sparkData={spkDown}
                    sparkColor={T.accent}
                    icon="dollar"
                />
                <MetricCard label="Net Profit" value="$39,454" change="+15.99%" sparkData={spkUp} sparkColor={T.green} icon="dollar" />
                <MetricCard label="Net Margin" value="65.5%" change="+8.2%" sparkData={spkUp} sparkColor={T.green} icon="chart" />
                <MetricCard
                    label="Ad Spend"
                    value={`$${TOTAL_AD_SPEND.toLocaleString()}`}
                    change="-42.33%"
                    sparkData={spkDown}
                    sparkColor={T.red}
                    icon="dollar"
                />
            </div>

            {/* Profit by Product */}
            <SectionHead
                icon="box"
                label="Profit by Product"
                right={
                    <button
                        onClick={() => setCogsSetup(false)}
                        style={{
                            padding: "5px 14px",
                            borderRadius: 6,
                            border: `1px solid ${T.border}`,
                            background: "transparent",
                            color: T.muted,
                            fontSize: 10,
                            fontFamily: fonts.mono,
                            cursor: "pointer",
                        }}
                    >
                        Edit COGS
                    </button>
                }
            />
            <div
                style={{
                    background: T.bgCard,
                    border: `1px solid ${T.border}`,
                    borderRadius: 12,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "0.3fr 2fr 0.7fr 0.8fr 0.7fr 0.8fr 0.8fr 0.8fr 0.7fr",
                        gap: 6,
                        padding: "12px 16px",
                        borderBottom: `1px solid ${T.border}`,
                        background: T.bgInput,
                    }}
                >
                    {["", "Product", "Units", "Revenue", "COGS", "Shipping", "Ad Cost", "Profit", "Margin"].map((h) => (
                        <span key={h} style={{ fontSize: 9, fontWeight: 600, color: T.dim, fontFamily: fonts.mono }}>
                            {h}
                        </span>
                    ))}
                </div>

                {PRODUCTS_FILLED.map((p) => {
                    const ac = (TOTAL_AD_SPEND / totalUnits) * p.units;
                    const pr = p.revenue - p.cogs * p.units - p.shipping * p.units - ac;
                    const mg = (pr / p.revenue) * 100;

                    return (
                        <div
                            key={p.id}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "0.3fr 2fr 0.7fr 0.8fr 0.7fr 0.8fr 0.8fr 0.8fr 0.7fr",
                                gap: 6,
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
                            <span style={{ fontSize: 11, fontFamily: fonts.mono, color: T.muted }}>{p.units}</span>
                            <span style={{ fontSize: 11, fontFamily: fonts.mono, fontWeight: 600 }}>${p.revenue.toLocaleString()}</span>
                            <span style={{ fontSize: 11, fontFamily: fonts.mono, color: T.red }}>
                                ${(p.cogs * p.units).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                            <span style={{ fontSize: 11, fontFamily: fonts.mono, color: T.orange }}>
                                ${(p.shipping * p.units).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                            <span style={{ fontSize: 11, fontFamily: fonts.mono, color: T.yellow }}>
                                ${ac.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                            <span
                                style={{ fontSize: 11, fontFamily: fonts.mono, color: pr > 0 ? T.green : T.red, fontWeight: 700 }}
                            >
                                ${pr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <div style={{ width: 32, height: 4, borderRadius: 2, background: T.bgInput, overflow: "hidden" }}>
                                    <div
                                        style={{
                                            width: `${Math.max(0, Math.min(100, mg))}%`,
                                            height: "100%",
                                            background: mg > 40 ? T.green : mg > 20 ? T.yellow : T.red,
                                            borderRadius: 2,
                                        }}
                                    />
                                </div>
                                <span
                                    style={{
                                        fontSize: 10,
                                        fontFamily: fonts.mono,
                                        color: mg > 40 ? T.green : mg > 20 ? T.yellow : T.red,
                                        fontWeight: 600,
                                    }}
                                >
                                    {mg.toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ── Cost Input Helper ──

const CostInput: React.FC = () => (
    <div style={{ position: "relative" }}>
        <span
            style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 11,
                color: T.dim,
                fontFamily: fonts.mono,
            }}
        >
            $
        </span>
        <input
            type="text"
            placeholder="0.00"
            style={{
                width: "100%",
                padding: "6px 8px 6px 18px",
                borderRadius: 6,
                border: `1px solid ${T.border}`,
                background: T.bgInput,
                color: T.text,
                fontSize: 12,
                fontFamily: fonts.mono,
                outline: "none",
                boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = T.accent)}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
        />
    </div>
);

export default withLayoutBasic(PnLPage);
