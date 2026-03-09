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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 28px",
        borderBottom: `1px solid ${T.border}`,
        background: T.bg,
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div>
        <div style={{ fontSize: 17, fontWeight: 700 }}>{PAGE_TITLES[page]}</div>
        <div style={{ fontSize: 11, color: T.dim, fontFamily: fonts.mono, marginTop: 1 }}>{dateLabel}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
        {/* Date Preset Buttons */}
        <div
          style={{
            display: "flex",
            background: T.bgInput,
            borderRadius: 7,
            border: `1px solid ${T.border}`,
            overflow: "hidden",
          }}
        >
          {DATE_OPTS.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                onDateRangeChange(o.id);
                if (o.id === "custom") setShowCustomDate(!showCustomDate);
                else setShowCustomDate(false);
              }}
              style={{
                padding: "5px 12px",
                border: "none",
                fontSize: 10,
                fontWeight: 600,
                fontFamily: fonts.mono,
                cursor: "pointer",
                background: dateRange === o.id ? T.accentDim : "transparent",
                color: dateRange === o.id ? T.accent : T.muted,
              }}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Custom Date Picker Dropdown */}
        {showCustomDate && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: T.bgCard,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              padding: 16,
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minWidth: 260,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: T.muted, fontFamily: fonts.mono }}>
              Custom Date Range
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: fonts.mono, marginBottom: 4 }}>FROM</div>
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => onCustomFromChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: `1px solid ${T.border}`,
                    background: T.bgInput,
                    color: T.text,
                    fontSize: 11,
                    fontFamily: fonts.mono,
                    outline: "none",
                    boxSizing: "border-box",
                    colorScheme: "dark",
                  }}
                />
              </div>
              <span style={{ color: T.dim, fontSize: 12, marginTop: 14 }}>to</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: fonts.mono, marginBottom: 4 }}>TO</div>
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => onCustomToChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: `1px solid ${T.border}`,
                    background: T.bgInput,
                    color: T.text,
                    fontSize: 11,
                    fontFamily: fonts.mono,
                    outline: "none",
                    boxSizing: "border-box",
                    colorScheme: "dark",
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => setShowCustomDate(false)}
              style={{
                padding: "7px 16px",
                borderRadius: 6,
                border: "none",
                background: T.grad,
                color: "#000",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: fonts.mono,
                cursor: "pointer",
              }}
            >
              Apply Range
            </button>
          </div>
        )}

        {/* Settings */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 7,
            border: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Ico type="settings" size={14} color={T.dim} />
        </div>
      </div>
    </div>
  );
};
