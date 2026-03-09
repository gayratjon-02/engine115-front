import React, { useState, useMemo } from "react";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { T } from "../../libs/theme/theme";
import { Ico } from "../../libs/components/common/Ico";
import { DemoBanner, SampleWatermark, UpgradeCta, FilterDropdown, CreativeCard } from "../../libs/components/common/Shared";
import { CREATIVES_DEMO } from "../../libs/data/mockData";
import type { CreativeFilters } from "../../libs/types";

interface CreativesPageProps {
    isDemo?: boolean;
}

const CreativesPage: React.FC<CreativesPageProps> = ({ isDemo = true }) => {
    const [filters, setFilters] = useState<CreativeFilters>({
        campaign: "all",
        adSet: "all",
        searchAd: "",
    });
    const [showVideoMetrics, setShowVideoMetrics] = useState<Record<number, boolean>>({});

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
        <div className="creatives-page">
            {/* Header */}
            <div className="page-header">
                <Ico type="trophy" size={22} color={T.yellow} />
                <span className="page-title">Top Creatives</span>
                {isDemo && (
                    <div className="demo-badge">
                        <span>EXAMPLE DATA</span>
                    </div>
                )}
                <span className="result-count">
                    {filteredCreatives.length} {isDemo ? "sample " : ""}ads
                </span>
            </div>
            <p className="page-subtitle">
                AI-ranked top performing creatives. The AI decides what wins based on your trained scoring model.
            </p>

            {/* Demo Banner */}
            {isDemo && <DemoBanner feature="AI Creative Analysis" />}

            {/* Ask AI Button */}
            <div className="ask-ai-row">
                <div className="ask-ai-btn">
                    <Ico type="msg" size={14} color={T.muted} />
                    <span>Ask me anything</span>
                </div>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <div className="search-wrap">
                    <input
                        type="text"
                        placeholder="Search ad name..."
                        value={filters.searchAd}
                        onChange={(e) => setFilters({ ...filters, searchAd: e.target.value })}
                        className="search-input"
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
                        className="clear-filters-btn"
                    >
                        <Ico type="x" size={12} color={T.red} />
                        <span>Clear filters</span>
                    </div>
                )}
            </div>

            {/* Card Grid */}
            <div className="creatives-grid">
                {filteredCreatives.map((ad) => (
                    <CreativeCard key={ad.id} ad={ad} />
                ))}
            </div>

            {/* Empty State */}
            {filteredCreatives.length === 0 && (
                <div className="empty-state">
                    <Ico type="search" size={32} color={T.dim} />
                    <div className="empty-title">No creatives match your filters</div>
                    <div className="empty-sub">Try adjusting your campaign, ad set, or search filters</div>
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
        </div>
    );
};

export default withLayoutBasic(CreativesPage);
