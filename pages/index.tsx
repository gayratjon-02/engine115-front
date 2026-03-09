import React from "react";
import withLayoutBasic from "../libs/components/layout/LayoutBasic";
import { T } from "../libs/theme/theme";
import { MetricCard } from "../libs/components/common/MetricCard";
import { SectionHead, LockedWrap } from "../libs/components/common/Shared";
import { Ico } from "../libs/components/common/Ico";
import { DASHBOARD_FAVORITES, DASHBOARD_CHANNELS } from "../libs/data/mockData";

const CHANNEL_LABELS: Record<string, { label: string; icon: string; color: string }> = {
    shopify: { label: "Shopify", icon: "box", color: T.green },
    meta: { label: "Meta Ads", icon: "image", color: T.blue },
    google: { label: "Google Ads", icon: "search", color: T.yellow },
    tiktok: { label: "TikTok Ads", icon: "play", color: T.pink },
    blended: { label: "Blended", icon: "layers", color: T.accent },
};

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            {/* ── Favorites ── */}
            <SectionHead
                icon="star"
                label="Favorites"
                right={
                    <span className="edit-pins-link">Edit pins</span>
                }
            />
            <div className="favorites-grid">
                {DASHBOARD_FAVORITES.map((m, i) => (
                    <MetricCard key={i} {...m} />
                ))}
            </div>

            {/* ── Channel Sections ── */}
            {DASHBOARD_CHANNELS.map((channel) => {
                const meta = CHANNEL_LABELS[channel.channel] || {
                    label: channel.channel,
                    icon: "grid",
                    color: T.muted,
                };
                return (
                    <div key={channel.channel} className="channel-section">
                        <SectionHead icon={meta.icon} label={meta.label} />
                        <div
                            className="channel-metrics-grid"
                            style={{ gridTemplateColumns: `repeat(${Math.min(channel.metrics.length, 4)}, 1fr)` }}
                        >
                            {channel.metrics.map((m, i) => (
                                <MetricCard key={i} {...m} />
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* ── Pro Feature Previews ── */}
            <div className="pro-previews-grid">
                <LockedWrap
                    title="LTV Cohort Analysis"
                    icon="layers"
                    desc="See customer lifetime value at 30, 60, 90, 120, 180, and 365 days"
                >
                    <div className="ltv-preview">
                        {["30d: $42", "60d: $67", "90d: $89", "180d: $135"].map((v) => (
                            <div key={v} className="ltv-preview-item">
                                <div className="ltv-value">{v.split(": ")[1]}</div>
                                <div className="ltv-label">{v.split(": ")[0]}</div>
                            </div>
                        ))}
                    </div>
                </LockedWrap>

                <LockedWrap
                    title="AI Creative Analysis"
                    icon="brain"
                    desc="AI-ranked top performing creatives with scoring insights"
                >
                    <div className="ai-preview-grid">
                        {[
                            { label: "Top Hook", value: "UGC Testimonial", icon: "zap" },
                            { label: "Best Format", value: "Video < 30s", icon: "play" },
                            { label: "Scale Next", value: "Ad #3 - Demo", icon: "chart" },
                            { label: "Fatigue Alert", value: "2 ads declining", icon: "bulb" },
                        ].map((card) => (
                            <div key={card.label} className="ai-preview-card">
                                <div className="ai-card-header">
                                    <Ico type={card.icon} size={12} color={T.accent} />
                                    <span className="ai-card-label">{card.label}</span>
                                </div>
                                <div className="ai-card-value">{card.value}</div>
                            </div>
                        ))}
                    </div>
                </LockedWrap>
            </div>
        </div>
    );
};

export default withLayoutBasic(DashboardPage);
