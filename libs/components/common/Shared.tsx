import React, { useState } from "react";
import { T } from "../../theme/theme";
import { Ico } from "./Ico";
import type { Creative } from "../../types";

// ── Section Header ──

interface SectionHeadProps {
  icon?: string;
  label: string;
  badge?: string;
  right?: React.ReactNode;
}

export const SectionHead: React.FC<SectionHeadProps> = ({ icon, label, badge, right }) => (
  <div className="section-head">
    <div className="section-head-left">
      {icon && <Ico type={icon} size={16} color={T.muted} />}
      <span className="section-title">{label}</span>
      {badge && <div className="section-badge">{badge}</div>}
    </div>
    {right}
  </div>
);

// ── Locked Section Wrapper ──

interface LockedWrapProps {
  title: string;
  icon?: string;
  desc?: string;
  children: React.ReactNode;
}

export const LockedWrap: React.FC<LockedWrapProps> = ({ title, icon, desc, children }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="locked-wrap"
    >
      <SectionHead icon={icon} label={title} badge="PRO" />
      <div className="locked-content">{children}</div>
      <div className={`locked-overlay ${hov ? "is-hovered" : ""}`}>
        <div className={`lock-icon-wrap ${hov ? "is-hovered" : ""}`}>
          <Ico type="lock" size={20} color={hov ? T.accent : T.muted} />
        </div>
        <span className={`lock-text ${hov ? "is-hovered" : ""}`}>
          {hov ? "Unlock with Pro - $99/mo" : "Pro Feature"}
        </span>
        {desc && <span className="lock-desc">{desc}</span>}
        {hov && <button className="unlock-btn">Upgrade Now</button>}
      </div>
    </div>
  );
};

// ── Demo Banner ──

interface DemoBannerProps {
  feature: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ feature }) => (
  <div className="demo-banner">
    <div className="banner-icon-wrap">
      <Ico type="star" size={18} color={T.purple} />
    </div>
    <div className="banner-body">
      <div className="banner-title">
        You're viewing example data
        <span className="sample-badge">SAMPLE</span>
      </div>
      <div className="banner-text">
        This is a preview of {feature} using sample data from a demo store. Upgrade to Pro to see your
        real{" "}
        {feature === "AI Creative Analysis"
          ? "ad creatives and performance"
          : "customer lifetime value and cohort"}{" "}
        data from your connected Shopify store.
      </div>
    </div>
    <button className="banner-btn">Upgrade to Pro - $99/mo</button>
  </div>
);

// ── Sample Watermark ──

export const SampleWatermark: React.FC = () => (
  <div className="sample-watermark">
    <Ico type="star" size={14} color="#fff" />
    <span className="watermark-label">SAMPLE DATA</span>
    <span className="watermark-sub">Upgrade for real data</span>
  </div>
);

// ── Upgrade CTA ──

interface UpgradeCtaProps {
  title: string;
  description: string;
}

export const UpgradeCta: React.FC<UpgradeCtaProps> = ({ title, description }) => (
  <div className="upgrade-cta">
    <div className="cta-title">{title}</div>
    <div className="cta-desc">{description}</div>
    <button className="cta-btn">Upgrade to Pro - $99/mo</button>
    <div className="cta-note">FLAT RATE - NO GMV SCALING</div>
  </div>
);

// ── Filter Dropdown ──

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, value, onChange, icon }) => {
  const [open, setOpen] = useState(false);
  const hasValue = value !== "all";
  return (
    <div className="filter-dropdown">
      <div
        onClick={() => setOpen(!open)}
        className={`filter-trigger ${hasValue ? "has-value" : ""}`}
      >
        <Ico type={icon || "filter"} size={12} color={hasValue ? T.accent : T.dim} />
        <span className="filter-text">{hasValue ? value : label}</span>
        {hasValue && (
          <span
            onClick={(e) => { e.stopPropagation(); onChange("all"); setOpen(false); }}
            className="filter-clear"
          >
            <Ico type="x" size={10} color={T.accent} />
          </span>
        )}
      </div>
      {open && (
        <div className="filter-menu">
          <div
            onClick={() => { onChange("all"); setOpen(false); }}
            className="filter-option"
          >
            All
          </div>
          {options.map((o) => (
            <div
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              className={`filter-option ${value === o ? "is-active" : ""}`}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Creative Card ──

interface CreativeCardProps {
  ad: Creative;
}

export const CreativeCard: React.FC<CreativeCardProps> = ({ ad }) => {
  const [hov, setHov] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const rankColor =
    ad.rankInAdSet === 1 ? T.green : ad.rankInAdSet === 2 ? T.accent : ad.rankInAdSet === 3 ? T.yellow : T.muted;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="creative-card"
    >
      {/* Thumbnail */}
      <div className="thumbnail" style={{ background: ad.thumb.bg }}>
        <div
          className="thumb-overlay"
          style={{ background: `linear-gradient(135deg, ${ad.thumb.bg}, ${ad.thumb.bg}cc)` }}
        />
        <span className="thumb-text">{ad.thumb.text}</span>
        <div className="type-badge">
          {ad.type === "Video" && <Ico type="play" size={8} color="#fff" />}
          {ad.type}
        </div>
        <div className="rank-badge">
          <span className="rank-num" style={{ color: rankColor }}>#{ad.rankInAdSet}</span>
          <span className="rank-total">/ {ad.totalInAdSet}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="ad-name">{ad.name}</div>
        <div className="ad-meta">
          {[
            { label: "Campaign", value: ad.campaign },
            { label: "Ad Set", value: ad.adSet },
            { label: "Rank", value: `#${ad.rankInAdSet} in ad set by spend`, color: rankColor },
          ].map((row, i) => (
            <div key={i} className="meta-row">
              <span className="meta-label">{row.label}</span>
              {row.color ? (
                <span className="meta-value-colored" style={{ color: row.color }}>{row.value}</span>
              ) : (
                <span className="meta-value">{row.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="card-divider" />

        <div className="card-metrics">
          {[
            { l: "ROAS", v: ad.roas.toFixed(2), c: T.accent },
            { l: "Spend", v: `$${ad.spend.toLocaleString()}`, c: T.text },
            { l: "CPA", v: `$${ad.cpa.toFixed(2)}`, c: T.text },
            { l: "CTR (link click)", v: `${ad.ctr}%`, c: T.text },
          ].map((m, i) => (
            <div key={i} className="metric-row">
              <span className="metric-label">{m.l}</span>
              <span className="metric-value" style={{ color: m.c }}>{m.v}</span>
            </div>
          ))}

          {ad.type === "Video" && (
            <>
              <div className="video-toggle" onClick={() => setShowVideo(!showVideo)}>
                <span className="toggle-label">Creative Analytics</span>
                <span className={`toggle-chevron ${showVideo ? "is-open" : ""}`}>▾</span>
              </div>
              {showVideo && (
                <>
                  <div className="video-metrics-divider" />
                  {[
                    { l: "Thumb Stop", v: ad.thumbStop ? `${ad.thumbStop}%` : "--" },
                    { l: "Avg Play", v: ad.avgPlay ? `${ad.avgPlay}s` : "--" },
                    { l: "Hold Rate", v: ad.holdRate ? `${ad.holdRate}%` : "--" },
                  ].map((m, i) => (
                    <div key={i} className="video-metric-row">
                      <span className="v-label">{m.l}</span>
                      <span className={`v-value ${m.v === "--" ? "is-empty" : ""}`}>{m.v}</span>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
