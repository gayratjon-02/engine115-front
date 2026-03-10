import React, { useState, useEffect } from "react";
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

        {/* Account + Theme Toggle */}
        <div className="account-item-wrap">
          <div className="account-row">
            <SidebarItem
              icon="user"
              label="Account"
              active={page === "account"}
              collapsed={collapsed}
              onClick={() => router.push("/account")}
            />
            {!collapsed && <ThemeToggle />}
          </div>
        </div>
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

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !dark;
    setDark(next);
    const theme = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <button className={`theme-toggle ${dark ? "is-dark" : "is-light"}`} onClick={toggle} title={dark ? "Light mode" : "Dark mode"}>
      <Ico type={dark ? "moon" : "sun"} size={14} color={dark ? "#6B7799" : "#D97706"} />
    </button>
  );
};

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
