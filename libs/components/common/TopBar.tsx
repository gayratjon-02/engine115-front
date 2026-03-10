import React, { useState } from "react";
import { T, fonts } from "../../theme/theme";
import { Ico } from "./Ico";
import type { DatePreset, PageId } from "../../types";

interface TopBarProps {
  page: PageId;
  dateRange: DatePreset;
  onDateRangeChange: (range: DatePreset) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (date: string) => void;
  onCustomToChange: (date: string) => void;
}

const DATE_OPTS: { id: DatePreset; label: string }[] = [
  { id: "7d", label: "7D" },
  { id: "14d", label: "14D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
  { id: "custom", label: "Custom" },
];

const PAGE_TITLES: Record<PageId, string> = {
  dashboard: "Dashboard",
  pnl: "P&L",
  creatives: "AI Creative Analysis",
  ltv: "LTV Cohorts",
  integrations: "Integrations",
  account: "Account",
};

export const TopBar: React.FC<TopBarProps> = ({
  page,
  dateRange,
  onDateRangeChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
}) => {
  const [showCustomDate, setShowCustomDate] = useState(false);

  const dateLabel =
    dateRange === "custom"
      ? `${new Date(customFrom).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(customTo).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      : dateRange === "7d"
        ? "Feb 7 - Feb 14, 2026"
        : dateRange === "14d"
          ? "Feb 1 - Feb 14, 2026"
          : dateRange === "30d"
            ? "Jan 15 - Feb 14, 2026"
            : "Nov 16, 2025 - Feb 14, 2026";

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="page-title">{PAGE_TITLES[page]}</div>
        <div className="date-label">{dateLabel}</div>
      </div>

      <div className="topbar-right">
        {/* Date Preset Buttons */}
        <div className="date-presets">
          {DATE_OPTS.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                onDateRangeChange(o.id);
                if (o.id === "custom") setShowCustomDate(!showCustomDate);
                else setShowCustomDate(false);
              }}
              className={`preset-btn ${dateRange === o.id ? "is-active" : ""}`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Custom Date Picker Dropdown */}
        {showCustomDate && (
          <div className="custom-date-dropdown">
            <div className="dropdown-title">
              Custom Date Range
            </div>
            <div className="date-inputs-row">
              <div className="date-input-group">
                <div className="input-label">FROM</div>
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => onCustomFromChange(e.target.value)}
                  className="date-input"
                />
              </div>
              <span className="to-separator">to</span>
              <div className="date-input-group">
                <div className="input-label">TO</div>
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => onCustomToChange(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            <button
              onClick={() => setShowCustomDate(false)}
              className="apply-btn"
            >
              Apply Range
            </button>
          </div>
        )}

        {/* Settings */}
        <div className="settings-btn">
          <Ico type="settings" size={14} color={T.dim} />
        </div>
      </div>
    </div>
  );
};
