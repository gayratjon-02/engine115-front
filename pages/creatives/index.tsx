import React, { useState, useMemo } from "react";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { T, fonts } from "../../libs/theme/theme";
import { Ico } from "../../libs/components/common/Ico";
import { DemoBanner, SampleWatermark, UpgradeCta, FilterDropdown, CreativeCard } from "../../libs/components/common/Shared";
import { CREATIVES_DEMO } from "../../libs/data/mockData";
import type { CreativeFilters } from "../../libs/types";

interface CreativesPageProps {
    isDemo?: boolean; // true = free tier, show sample data
}

const CreativesPage: React.FC<CreativesPageProps> = ({ isDemo = true }) => {
    const [filters, setFilters] = useState<CreativeFilters>({
        campaign: "all",
        adSet: "all",
        searchAd: "",
    });
    const [showVideoMetrics, setShowVideoMetrics] = useState<Record<number, boolean>>({});

    // Derive campaigns and ad sets from data
    const campaigns = useMemo(
        () => Array.from(new Set(CREATIVES_DEMO.map((c) => c.campaign))),
        []
    );

    const adSets = useMemo(() => {
        const filtered =
            filters.campaign === "all"
                ? CREATIVES_DEMO
                : CREATIVES_DEMO.filter((c) => c.campaign === filters.campaign);
        return Array.from(new Set(filtered.map((c) => c.adSet)));
    }, [filters.campaign]);

    // Apply all filters
    const filteredCreatives = useMemo(() => {
        return CREATIVES_DEMO.filter((c) => {
            if (filters.campaign !== "all" && c.campaign !== filters.campaign) return false;
            if (filters.adSet !== "all" && c.adSet !== filters.adSet) return false;
            if (filters.searchAd && !c.name.toLowerCase().includes(filters.searchAd.toLowerCase())) return false;
            return true;
        });
    }, [filters]);

    const hasFilters = filters.campaign !== "all" || filters.adSet !== "all" || filters.searchAd;

    return (
        <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <Ico type="trophy" size={22} color={T.yellow} />
                <span style={{ fontSize: 20, fontWeight: 700 }}>Top Creatives</span>
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
                <span style={{ fontSize: 12, color: T.dim, fontFamily: fonts.mono }}>
                    {filteredCreatives.length} {isDemo ? "sample " : ""}ads
                </span>
            </div>
            <p style={{ fontSize: 13, color: T.muted, marginBottom: 18, marginTop: 0 }}>
                AI-ranked top performing creatives. The AI decides what wins based on your trained scoring model.
            </p>

            {/* Demo Banner */}
            {isDemo && <DemoBanner feature="AI Creative Analysis" />}

            {/* Ask AI Button */}
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                <div
                    style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: `1px solid ${T.border}`,
                        background: T.bgCard,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                    }}
                >
                    <Ico type="msg" size={14} color={T.muted} />
                    <span style={{ fontSize: 12, color: T.text, fontWeight: 500 }}>Ask me anything</span>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ position: "relative", flex: "0 0 220px" }}>
                    <input
                        type="text"
                        placeholder="Search ad name..."
                        value={filters.searchAd}
                        onChange={(e) => setFilters({ ...filters, searchAd: e.target.value })}
                        style={{
                            width: "100%",
                            padding: "7px 10px",
                            borderRadius: 7,
                            border: `1px solid ${T.border}`,
                            background: T.bgInput,
                            color: T.text,
                            fontSize: 11,
                            fontFamily: fonts.sans,
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = T.accent)}
                        onBlur={(e) => (e.target.style.borderColor = T.border)}
                    />
                </div>
                <FilterDropdown
                    label="Campaign"
                    options={campaigns}
                    value={filters.campaign}
                    onChange={(v) => setFilters({ ...filters, campaign: v, adSet: "all" })}
                    icon="layers"
                />
                <FilterDropdown
                    label="Ad Set"
                    options={adSets}
                    value={filters.adSet}
                    onChange={(v) => setFilters({ ...filters, adSet: v })}
                    icon="grid"
                />
                {hasFilters && (
                    <div
                        onClick={() => setFilters({ campaign: "all", adSet: "all", searchAd: "" })}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 7,
                            border: `1px solid ${T.border}`,
                            background: T.bgCard,
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            cursor: "pointer",
                        }}
                    >
                        <Ico type="x" size={12} color={T.red} />
                        <span style={{ fontSize: 11, color: T.red, fontWeight: 500 }}>Clear filters</span>
                    </div>
                )}
            </div>

            {/* Card Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {filteredCreatives.map((ad) => (
                    <CreativeCard key={ad.id} ad={ad} />
                ))}
            </div>

            {/* Empty State */}
            {filteredCreatives.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 0", color: T.dim }}>
                    <Ico type="search" size={32} color={T.dim} />
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12, color: T.muted }}>
                        No creatives match your filters
                    </div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>Try adjusting your campaign, ad set, or search filters</div>
                </div>
            )}

            {/* Bottom CTA */}
            {isDemo && (
                <UpgradeCta
                    title="See your real creatives ranked by AI"
                    description="Upgrade to Pro and Engine115 will pull your actual ad creatives from Meta, rank them with AI, and show you exactly what to scale next."
                />
            )}

            {isDemo && <SampleWatermark />}
        </>
    );
};

export default withLayoutBasic(CreativesPage);
