import React, { useState } from "react";
import { T, fonts } from "../../theme/theme";
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
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {icon && <Ico type={icon} size={16} color={T.muted} />}
      <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{label}</span>
      {badge && (
        <div
          style={{
            padding: "2px 8px",
            borderRadius: 5,
            fontSize: 9,
            fontWeight: 700,
            fontFamily: fonts.mono,
            background: T.gradPurple,
            color: T.purple,
            border: `1px solid ${T.purple}30`,
          }}
        >
          {badge}
        </div>
      )}
    </div>
    {right}
  </div>
);

// ── Locked Section Wrapper (for dashboard previews) ──

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
      style={{
        background: T.bgCard,
        border: `1px solid ${hov ? T.accent + "30" : T.border}`,
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.3s",
        padding: 20,
      }}
    >
      <SectionHead icon={icon} label={title} badge="PRO" />
      <div style={{ filter: "blur(5px)", opacity: 0.25, pointerEvents: "none" }}>{children}</div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: hov ? `linear-gradient(180deg, transparent, ${T.accent}06)` : "transparent",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: hov ? T.accentDim : T.bgInput,
            border: `1px solid ${hov ? T.accent + "50" : T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
        >
          <Ico type="lock" size={20} color={hov ? T.accent : T.muted} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: hov ? T.text : T.muted }}>
          {hov ? "Unlock with Pro - $99/mo" : "Pro Feature"}
        </span>
        {desc && (
          <span style={{ fontSize: 11, color: T.dim, textAlign: "center", maxWidth: 300, lineHeight: 1.5 }}>
            {desc}
          </span>
        )}
        {hov && (
          <button
            style={{
              marginTop: 4,
              padding: "8px 24px",
              borderRadius: 8,
              border: "none",
              background: T.grad,
              color: "#000",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Upgrade Now
          </button>
        )}
      </div>
    </div>
  );
};

// ── Demo Banner (for Pro feature previews on free tier) ──

interface DemoBannerProps {
  feature: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ feature }) => (
  <div
    style={{
      background: `linear-gradient(135deg, ${T.purple}12, ${T.accent}08)`,
      border: `1px solid ${T.purple}30`,
      borderRadius: 12,
      padding: "14px 20px",
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      gap: 14,
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: T.gradPurple,
        border: `1px solid ${T.purple}30`,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ico type="star" size={18} color={T.purple} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, display: "flex", alignItems: "center", gap: 8 }}>
        You're viewing example data
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 9,
            fontWeight: 700,
            fontFamily: fonts.mono,
            background: `${T.yellow}20`,
            color: T.yellow,
            border: `1px solid ${T.yellow}30`,
          }}
        >
          SAMPLE
        </span>
      </div>
      <div style={{ fontSize: 11, color: T.muted }}>
        This is a preview of {feature} using sample data from a demo store. Upgrade to Pro to see your real{" "}
        {feature === "AI Creative Analysis"
          ? "ad creatives and performance"
          : "customer lifetime value and cohort"}{" "}
        data from your connected Shopify store.
      </div>
    </div>
    <button
      style={{
        padding: "9px 24px",
        borderRadius: 7,
        border: "none",
        background: T.grad,
        color: "#000",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      Upgrade to Pro - $99/mo
    </button>
  </div>
);

// ── Sample Watermark (floating badge for demo pages) ──

export const SampleWatermark: React.FC = () => (
  <div
    style={{
      position: "fixed",
      bottom: 20,
      right: 24,
      padding: "8px 16px",
      borderRadius: 8,
      background: `${T.purple}dd`,
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      gap: 8,
      zIndex: 50,
      boxShadow: `0 4px 20px ${T.purple}40`,
    }}
  >
    <Ico type="star" size={14} color="#fff" />
    <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: fonts.mono }}>SAMPLE DATA</span>
    <span style={{ fontSize: 10, color: "#ffffffaa" }}>Upgrade for real data</span>
  </div>
);

// ── Upgrade CTA (bottom of Pro pages) ──

interface UpgradeCtaProps {
  title: string;
  description: string;
}

export const UpgradeCta: React.FC<UpgradeCtaProps> = ({ title, description }) => (
  <div
    style={{
      marginTop: 28,
      background: `linear-gradient(135deg, ${T.accent}06, ${T.purple}08)`,
      border: `1px solid ${T.purple}25`,
      borderRadius: 12,
      padding: "20px 24px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{title}</div>
    <div style={{ fontSize: 12, color: T.muted, marginBottom: 14, maxWidth: 480, margin: "0 auto 14px" }}>
      {description}
    </div>
    <button
      style={{
        padding: "10px 32px",
        borderRadius: 8,
        border: "none",
        background: T.grad,
        color: "#000",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      Upgrade to Pro - $99/mo
    </button>
    <div style={{ marginTop: 8, fontSize: 10, color: T.dim, fontFamily: fonts.mono }}>
      FLAT RATE - NO GMV SCALING
    </div>
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
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "6px 12px",
          borderRadius: 7,
          border: `1px solid ${hasValue ? T.accent + "40" : T.border}`,
          background: hasValue ? T.accentGlow : T.bgCard,
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        <Ico type={icon || "filter"} size={12} color={hasValue ? T.accent : T.dim} />
        <span style={{ fontSize: 11, fontWeight: 500, color: hasValue ? T.accent : T.muted }}>
          {hasValue ? value : label}
        </span>
        {hasValue && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onChange("all");
              setOpen(false);
            }}
            style={{ marginLeft: 2, cursor: "pointer", display: "flex" }}
          >
            <Ico type="x" size={10} color={T.accent} />
          </span>
        )}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            minWidth: 220,
            maxHeight: 240,
            overflowY: "auto",
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            zIndex: 50,
            padding: 4,
          }}
        >
          <div
            onClick={() => {
              onChange("all");
              setOpen(false);
            }}
            style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, color: T.muted, fontWeight: 500 }}
          >
            All
          </div>
          {options.map((o) => (
            <div
              key={o}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 11,
                color: value === o ? T.accent : T.text,
                fontWeight: value === o ? 600 : 400,
                background: value === o ? T.accentGlow : "transparent",
              }}
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
      style={{
        background: T.bgCard,
        border: `1px solid ${hov ? T.borderHover : T.border}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "all 0.2s",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/10",
          background: ad.thumb.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${ad.thumb.bg}, ${ad.thumb.bg}cc)`,
            opacity: 0.9,
          }}
        />
        <span
          style={{
            position: "relative",
            fontSize: 12,
            color: "#ffffffcc",
            fontFamily: fonts.sans,
            fontWeight: 500,
            fontStyle: "italic",
            padding: "0 14px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {ad.thumb.text}
        </span>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            padding: "3px 8px",
            borderRadius: 4,
            background: "#00000080",
            backdropFilter: "blur(4px)",
            fontSize: 10,
            fontWeight: 600,
            color: "#fff",
            fontFamily: fonts.mono,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {ad.type === "Video" && <Ico type="play" size={8} color="#fff" />}
          {ad.type}
        </div>
        {/* Rank badge */}
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "3px 8px",
            borderRadius: 4,
            background: "#00000090",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 800, fontFamily: fonts.mono, color: rankColor }}>
            #{ad.rankInAdSet}
          </span>
          <span style={{ fontSize: 9, color: "#ffffff80", fontFamily: fonts.mono }}>/ {ad.totalInAdSet}</span>
        </div>
      </div>

      <div style={{ padding: "12px 14px" }}>
        {/* Ad Name */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: T.text,
            marginBottom: 8,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {ad.name}
        </div>

        {/* Campaign & Ad Set */}
        <div style={{ marginBottom: 10, display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { label: "Campaign", value: ad.campaign },
            { label: "Ad Set", value: ad.adSet },
            { label: "Rank", value: `#${ad.rankInAdSet} in ad set by spend`, color: rankColor },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 600, fontFamily: fonts.mono, color: T.dim, width: 52 }}>
                {row.label}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: row.color || T.muted,
                  fontWeight: row.color ? 700 : 500,
                  fontFamily: row.color ? fonts.mono : fonts.sans,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: T.border, marginBottom: 10 }} />

        {/* Metrics */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[
            { l: "ROAS", v: ad.roas.toFixed(2), c: T.accent },
            { l: "Spend", v: `$${ad.spend.toLocaleString()}`, c: T.text },
            { l: "CPA", v: `$${ad.cpa.toFixed(2)}`, c: T.text },
            { l: "CTR (link click)", v: `${ad.ctr}%`, c: T.text },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: T.muted }}>{m.l}</span>
              <span style={{ fontSize: 12, fontWeight: 600, fontFamily: fonts.mono, color: m.c }}>{m.v}</span>
            </div>
          ))}

          {/* Collapsible video metrics */}
          {ad.type === "Video" && (
            <>
              <div
                onClick={() => setShowVideo(!showVideo)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  padding: "4px 0",
                  marginTop: 2,
                }}
              >
                <span style={{ fontSize: 10, color: T.dim, fontWeight: 500 }}>Creative Analytics</span>
                <span
                  style={{
                    fontSize: 10,
                    color: T.dim,
                    transform: showVideo ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ▾
                </span>
              </div>
              {showVideo && (
                <>
                  <div style={{ height: 1, background: T.border, margin: "2px 0" }} />
                  {[
                    { l: "Thumb Stop", v: ad.thumbStop ? `${ad.thumbStop}%` : "--" },
                    { l: "Avg Play", v: ad.avgPlay ? `${ad.avgPlay}s` : "--" },
                    { l: "Hold Rate", v: ad.holdRate ? `${ad.holdRate}%` : "--" },
                  ].map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, color: T.dim }}>{m.l}</span>
                      <span style={{ fontSize: 11, fontFamily: fonts.mono, color: m.v === "--" ? T.dim : T.muted }}>
                        {m.v}
                      </span>
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
