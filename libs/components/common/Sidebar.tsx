import React, { useState } from "react";
import { useRouter } from "next/router";
import { T } from "../../theme/theme";
import { Ico } from "./Ico";
import { NAV_ITEMS } from "../../data/mockData";
import type { PageId } from "../../types";

interface SidebarProps {
  page: PageId;
  onPageChange: (page: PageId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ page, onPageChange, collapsed, onToggleCollapse }) => {
  const router = useRouter();

  return (
    <div className={`sidebar ${collapsed ? "is-collapsed" : "is-expanded"}`}>
      {/* Logo */}
      <div className={`sidebar-header ${collapsed ? "is-collapsed" : "is-expanded"}`} onClick={onToggleCollapse}>
        <div className="logo-icon">115</div>
        {!collapsed && <span className="logo-text">Engine115</span>}
      </div>

      {/* Store Selector */}
      {!collapsed && (
        <div className="store-selector-wrap">
          <div className="store-selector">
            <div className="status-dot" />
            <span className="store-name">Engine Co</span>
            <span className="store-platform">Shopify</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="nav-menu">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={page === item.id}
            pro={item.pro}
            collapsed={collapsed}
            onClick={() => onPageChange(item.id)}
          />
        ))}
      </div>

      {/* Bottom Section — pushes to the bottom */}
      <div className="sidebar-bottom">
        {/* Sources Badge */}
        {!collapsed && (
          <div className="sources-badge-wrap">
            <div className="sources-badge">
              <div className="status-dot" />
              <span className="source-count">3 Sources</span>
              <span className="source-status">Connected</span>
            </div>
          </div>
        )}

        {/* Upgrade CTA */}
        {!collapsed && (
          <div className="upgrade-cta-wrap">
            <div className="upgrade-cta">
              <div className="cta-text">Unlock AI Creative Analysis and LTV Cohort tracking</div>
              <div className="cta-price">PRO - $99/mo</div>
            </div>
          </div>
        )}

        {/* Account Link */}
        <SidebarItem
          icon="user"
          label="Account"
          active={false}
          collapsed={collapsed}
          onClick={() => router.push("/account")}
        />
      </div>
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
      className={`nav-item ${collapsed ? "is-collapsed" : "is-expanded"} ${active ? "is-active" : ""}`}
    >
      <Ico type={icon} size={16} color={active ? T.accent : hov ? T.text : T.muted} />
      {!collapsed && (
        <>
          <span className="nav-label">{label}</span>
          {pro && <span className="pro-badge">PRO</span>}
        </>
      )}
    </div>
  );
};
