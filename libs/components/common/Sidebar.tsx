import React, { useState } from "react";
import { T, fonts } from "../theme/theme";
import { Ico } from "./Ico";
import { NAV_ITEMS } from "../data/mockData";
import type { PageId } from "../types";

interface SidebarProps {
  page: PageId;
  onPageChange: (page: PageId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ page, onPageChange, collapsed, onToggleCollapse }) => {
  const sw = collapsed ? 64 : 220;

  return (
    <div
      style={{
        width: sw,
        minWidth: sw,
        height: "100vh",
        background: T.bgCard,
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s",
        overflow: "hidden",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        onClick={onToggleCollapse}
        style={{
          padding: collapsed ? "18px 16px" : "18px 20px",
          borderBottom: `1px solid ${T.border}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: T.grad,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            color: "#000",
            fontFamily: fonts.mono,
            flexShrink: 0,
          }}
        >
          115
        </div>
        {!collapsed && (
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>Engine115</span>
        )}
      </div>

      {/* Store Selector */}
      {!collapsed && (
        <div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}` }}>
          <div
            style={{
              padding: "7px 10px",
              borderRadius: 7,
              background: T.bgInput,
              border: `1px solid ${T.border}`,
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.green }} />
            <span style={{ fontWeight: 500 }}>Engine Co</span>
            <span style={{ marginLeft: "auto", fontSize: 9, color: T.dim }}>Shopify</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const active = page === item.id;
          return (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={active}
              pro={item.pro}
              collapsed={collapsed}
              onClick={() => onPageChange(item.id)}
            />
          );
        })}
      </div>

      {/* Sources Badge */}
      {!collapsed && (
        <div style={{ padding: "10px 14px", borderTop: `1px solid ${T.border}` }}>
          <div
            style={{
              padding: "7px 10px",
              borderRadius: 7,
              background: T.bgInput,
              border: `1px solid ${T.border}`,
              fontSize: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.green }} />
            <span style={{ color: T.muted }}>3 Sources</span>
            <span style={{ marginLeft: "auto", fontSize: 9, color: T.dim, fontFamily: fonts.mono }}>Connected</span>
          </div>
        </div>
      )}

      {/* Upgrade CTA */}
      {!collapsed && (
        <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.border}` }}>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: `linear-gradient(135deg, ${T.accent}08, ${T.blue}08)`,
              border: `1px solid ${T.accent}20`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 600, color: T.accent, marginBottom: 3 }}>
              Unlock AI Creative Analysis and LTV Cohort tracking
            </div>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: fonts.mono }}>PRO - $99/mo</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Sidebar Nav Item ──

interface SidebarItemProps {
  icon: string;
  label: string;
  active: boolean;
  pro?: boolean;
  collapsed: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, pro, collapsed, onClick }) => {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: collapsed ? "9px 16px" : "9px 12px",
        borderRadius: 8,
        cursor: "pointer",
        background: active ? T.accentGlow : hov ? T.bgHover : "transparent",
        transition: "all 0.15s",
        position: "relative",
      }}
    >
      <Ico type={icon} size={16} color={active ? T.accent : hov ? T.text : T.muted} />
      {!collapsed && (
        <>
          <span
            style={{
              fontSize: 12,
              fontWeight: active ? 600 : 500,
              color: active ? T.accent : hov ? T.text : T.muted,
              flex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {label}
          </span>
          {pro && (
            <span
              style={{
                padding: "2px 6px",
                borderRadius: 4,
                fontSize: 8,
                fontWeight: 700,
                fontFamily: fonts.mono,
                background: T.gradPurple,
                color: T.purple,
                border: `1px solid ${T.purple}25`,
              }}
            >
              PRO
            </span>
          )}
        </>
      )}
    </div>
  );
};
