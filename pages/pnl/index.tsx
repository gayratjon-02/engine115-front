import React, { useState } from "react";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { T } from "../../libs/theme/theme";
import { MetricCard } from "../../libs/components/common/MetricCard";
import { SectionHead } from "../../libs/components/common/Shared";
import { Ico } from "../../libs/components/common/Ico";
import { PRODUCTS_INIT, PRODUCTS_FILLED, TOTAL_AD_SPEND, spkUp, spkDown } from "../../libs/data/mockData";

const PnLPage: React.FC = () => {
    const [cogsSetup, setCogsSetup] = useState(false);

    if (!cogsSetup) {
        return (
            <div className="pnl-page">
                <SectionHead
                    icon="dollar"
                    label="Product Costs"
                    right={
                        <span style={{ fontSize: 10, color: T.dim, fontFamily: "monospace" }}>
                            {PRODUCTS_INIT.length} products synced from Shopify
                        </span>
                    }
                />
                <p className="page-intro">
                    Enter your COGS and shipping cost per unit to calculate true profitability.
                </p>

                <div className="data-table">
                    {/* Header Row */}
                    <div
                        className="table-header"
                        style={{ gridTemplateColumns: "0.3fr 2fr 0.8fr 1fr 1fr" }}
                    >
                        {["", "Product", "Price", "COGS / Unit", "Shipping / Unit"].map((h) => (
                            <span key={h} className="header-cell">{h}</span>
                        ))}
                    </div>

                    {/* Product Rows */}
                    {PRODUCTS_INIT.map((p) => (
                        <div
                            key={p.id}
                            className="table-row"
                            style={{ gridTemplateColumns: "0.3fr 2fr 0.8fr 1fr 1fr" }}
                        >
                            <div className="product-thumb">{p.img}</div>
                            <div className="product-info">
                                <div className="product-name">{p.name}</div>
                                <div className="product-sku">{p.sku}</div>
                            </div>
                            <span className="cell-mono cell-bold">${p.price.toFixed(2)}</span>
                            <CostInput />
                            <CostInput />
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="pnl-actions">
                    <button className="btn-cancel">Cancel</button>
                    <button onClick={() => setCogsSetup(true)} className="btn-save">
                        <Ico type="check" size={14} color="#000" /> Save Costs
                    </button>
                </div>
            </div>
        );
    }

    // ── P&L Results Screen ──
    const totalUnits = PRODUCTS_FILLED.reduce((s, p) => s + p.units, 0);

    return (
        <div className="pnl-page">
            {/* Summary Cards */}
            <div className="summary-grid">
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
                        className="btn-edit-cogs"
                    >
                        Edit COGS
                    </button>
                }
            />
            <div className="data-table">
                <div
                    className="table-header"
                    style={{ gridTemplateColumns: "0.3fr 2fr 0.7fr 0.8fr 0.7fr 0.8fr 0.8fr 0.8fr 0.7fr" }}
                >
                    {["", "Product", "Units", "Revenue", "COGS", "Shipping", "Ad Cost", "Profit", "Margin"].map((h) => (
                        <span key={h} className="header-cell">{h}</span>
                    ))}
                </div>

                {PRODUCTS_FILLED.map((p) => {
                    const ac = (TOTAL_AD_SPEND / totalUnits) * p.units;
                    const pr = p.revenue - p.cogs * p.units - p.shipping * p.units - ac;
                    const mg = (pr / p.revenue) * 100;

                    return (
                        <div
                            key={p.id}
                            className="table-row"
                            style={{ gridTemplateColumns: "0.3fr 2fr 0.7fr 0.8fr 0.7fr 0.8fr 0.8fr 0.8fr 0.7fr" }}
                        >
                            <div className="product-thumb">{p.img}</div>
                            <div className="product-info">
                                <div className="product-name">{p.name}</div>
                                <div className="product-sku">{p.sku}</div>
                            </div>
                            <span className="cell-mono cell-muted">{p.units}</span>
                            <span className="cell-mono cell-bold">${p.revenue.toLocaleString()}</span>
                            <span className="cell-mono cell-red">${(p.cogs * p.units).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            <span className="cell-mono cell-orange">${(p.shipping * p.units).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            <span className="cell-mono cell-yellow">${ac.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            <span className={`cell-mono ${pr > 0 ? "cell-profit-positive" : "cell-profit-negative"}`}>
                                ${pr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                            <div className="margin-bar-wrap">
                                <div className="margin-bar-track">
                                    <div
                                        className="margin-bar-fill"
                                        style={{
                                            width: `${Math.max(0, Math.min(100, mg))}%`,
                                            background: mg > 40 ? T.green : mg > 20 ? T.yellow : T.red,
                                        }}
                                    />
                                </div>
                                <span
                                    className="margin-bar-label"
                                    style={{ color: mg > 40 ? T.green : mg > 20 ? T.yellow : T.red }}
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
    <div className="cost-input-wrap">
        <span className="currency-prefix">$</span>
        <input
            type="text"
            placeholder="0.00"
            className="cost-input"
            onFocus={(e) => (e.target.style.borderColor = "#00E5CC")}
            onBlur={(e) => (e.target.style.borderColor = "#151B2E")}
        />
    </div>
);

export default withLayoutBasic(PnLPage);
