import React, { useState } from "react";
import { T } from "../../theme/theme";
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
        className="metric-card is-locked"
      >
        <div className="locked-blur">
          <div className="card-label">{label}</div>
          <div className="card-value">{value}</div>
          <Spark data={sparkData || spkUp} color={sparkColor || T.accent} />
        </div>
        <div className={`locked-overlay ${hov ? "is-hovered" : ""}`}>
          <div className={`lock-icon-wrap ${hov ? "is-hovered" : ""}`}>
            <Ico type="lock" size={14} color={hov ? T.accent : T.muted} />
          </div>
          <span className="lock-label" style={{ color: hov ? T.accent : T.muted }}>
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
      className="metric-card"
    >
      {pinned && (
        <div className="pin-icon">
          <Ico type="pin" size={12} color={T.blue} />
        </div>
      )}
      <div className="card-header">
        {icon && (
          <div
            className="icon-badge"
            style={{ background: `${sparkColor || T.accent}15` }}
          >
            <Ico type={icon} size={10} color={sparkColor || T.accent} />
          </div>
        )}
        <span className="card-label">{label}</span>
        {change && (
          <span className={`card-change ${isUp ? "is-up" : isDown ? "is-down" : "is-neutral"}`}>
            {isUp ? "↑" : isDown ? "↓" : ""}{" "}
            {change.replace("+", "").replace("-", "")}
          </span>
        )}
      </div>
      <div className="card-value">{value}</div>
      <Spark data={sparkData || spkUp} color={sparkColor || T.accent} w={120} h={32} />
    </div>
  );
};
