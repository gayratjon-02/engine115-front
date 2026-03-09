import React, { useState } from "react";
import { T, fonts } from "../../theme/theme";
import { Ico } from "./Ico";
import { Spark } from "./Spark";
import type { MetricValue } from "../../types";
import { spkUp } from "../../data/mockData";

type MetricCardProps = MetricValue;

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  sparkData,
  sparkColor,
  icon,
  locked,
  pinned,
}) => {
  const [hov, setHov] = useState(false);
  const isUp = change?.startsWith("+");
  const isDown = change?.startsWith("-");

  if (locked) {
    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: T.bgCard,
          border: `1px solid ${hov ? T.accent + "40" : T.border}`,
          borderRadius: 12,
          padding: "16px 18px",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        <div style={{ filter: "blur(7px)", opacity: 0.3, pointerEvents: "none" }}>
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 700, fontFamily: fonts.mono, color: T.text, marginBottom: 6 }}>
            {value}
          </div>
          <Spark data={sparkData || spkUp} color={sparkColor || T.accent} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: hov ? T.accentGlow : "transparent",
            transition: "all 0.3s",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: hov ? T.accentDim : T.bgInput,
              border: `1px solid ${hov ? T.accent + "50" : T.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
          >
            <Ico type="lock" size={14} color={hov ? T.accent : T.muted} />
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, color: hov ? T.accent : T.muted }}>
            {hov ? "Upgrade to Pro" : "Pro Feature"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.bgCard,
        border: `1px solid ${hov ? T.borderHover : T.border}`,
        borderRadius: 12,
        padding: "16px 18px",
        transition: "border-color 0.2s",
        position: "relative",
      }}
    >
      {pinned && (
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <Ico type="pin" size={12} color={T.blue} />
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        {icon && (
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: `${sparkColor || T.accent}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ico type={icon} size={10} color={sparkColor || T.accent} />
          </div>
        )}
        <span style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{label}</span>
        {change && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              fontFamily: fonts.mono,
              color: isUp ? T.green : isDown ? T.red : T.muted,
              marginLeft: 4,
            }}
          >
            {isUp ? "\u2191" : isDown ? "\u2193" : ""}{" "}
            {change.replace("+", "").replace("-", "")}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          fontFamily: fonts.mono,
          color: T.text,
          letterSpacing: "-0.02em",
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <Spark data={sparkData || spkUp} color={sparkColor || T.accent} w={120} h={32} />
    </div>
  );
};
