import React from "react";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { T, fonts } from "../../libs/theme/theme";
import { MetricCard } from "../../libs/components/common/MetricCard";
import { SectionHead, LockedWrap } from "../../libs/components/common/Shared";
import { Ico } from "../../libs/components/common/Ico";
import { DASHBOARD_FAVORITES, DASHBOARD_CHANNELS } from "../../libs/data/mockData";

const CHANNEL_LABELS: Record<string, { label: string; icon: string; color: string }> = {
    shopify: { label: "Shopify", icon: "box", color: T.green },
    meta: { label: "Meta Ads", icon: "image", color: T.blue },
    google: { label: "Google Ads", icon: "search", color: T.yellow },
    tiktok: { label: "TikTok Ads", icon: "play", color: T.pink },
    blended: { label: "Blended", icon: "layers", color: T.accent },
};

const DashboardPage = () => {
    return (
        <>
            {/* ── Favorites ── */}
            <SectionHead
                icon="star"
                label="Favorites"
                right={
                    <span style={{ fontSize: 10, color: T.dim, fontFamily: fonts.mono, cursor: "pointer" }}>Edit pins</span>
                }
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
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
                    <div key={channel.channel} style={{ marginBottom: 28 }}>
                        <SectionHead icon={meta.icon} label={meta.label} />
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(${Math.min(channel.metrics.length, 4)}, 1fr)`,
                                gap: 12,
                            }}
                        >
                            {channel.metrics.map((m, i) => (
                                <MetricCard key={i} {...m} />
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* ── Pro Feature Previews ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 12 }}>
                <LockedWrap
                    title="LTV Cohort Analysis"
                    icon="layers"
                    desc="See customer lifetime value at 30, 60, 90, 120, 180, and 365 days"
                >
                    <div style={{ display: "flex", gap: 12 }}>
                        {["30d: $42", "60d: $67", "90d: $89", "180d: $135"].map((v) => (
                            <div
                                key={v}
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                    background: T.bgInput,
                                    borderRadius: 8,
                                    padding: 12,
                                }}
                            >
                                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: fonts.mono }}>{v.split(": ")[1]}</div>
                                <div style={{ fontSize: 9, color: T.dim, fontFamily: fonts.mono }}>{v.split(": ")[0]}</div>
                            </div>
                        ))}
                    </div>
                </LockedWrap>

                <LockedWrap
                    title="AI Creative Analysis"
                    icon="brain"
                    desc="AI-ranked top performing creatives with scoring insights"
                >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {[
                            { label: "Top Hook", value: "UGC Testimonial", icon: "zap" },
                            { label: "Best Format", value: "Video < 30s", icon: "play" },
                            { label: "Scale Next", value: "Ad #3 - Demo", icon: "chart" },
                            { label: "Fatigue Alert", value: "2 ads declining", icon: "bulb" },
                        ].map((card) => (
                            <div
                                key={card.label}
                                style={{
                                    background: T.bgInput,
                                    borderRadius: 8,
                                    padding: 12,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                    <Ico type={card.icon} size={12} color={T.accent} />
                                    <span style={{ fontSize: 10, color: T.dim }}>{card.label}</span>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 600 }}>{card.value}</div>
                            </div>
                        ))}
                    </div>
                </LockedWrap>
            </div>
        </>
    );
};

export default withLayoutBasic(DashboardPage);
