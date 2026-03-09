import React, { useState } from "react";
import { T } from "../../theme/theme";
import { Ico } from "../common/Ico";

// ── Types ──

export interface Integration {
    id: string;
    name: string;
    icon: string;
    description: string;
    connected: boolean;
    lastSync?: string;
}

interface IntegrationsSectionProps {
    integrations: Integration[];
    onConnect: (id: string) => void;
    onDisconnect: (id: string) => void;
}

// ── Integrations Section ──

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
    integrations,
    onConnect,
    onDisconnect,
}) => {
    const connectedCount = integrations.filter((i) => i.connected).length;

    return (
        <div className="integrations-section">
            <div className="integrations-header">
                <div className="integrations-title-row">
                    <Ico type="zap" size={18} color={T.accent} />
                    <span className="integrations-title">Integrations</span>
                </div>
                <div className="integrations-count">
                    <span className="count-num">{connectedCount}</span>
                    <span className="count-sep">/</span>
                    <span className="count-total">{integrations.length}</span>
                    <span className="count-label">Connected</span>
                </div>
            </div>

            <div className="integrations-list">
                {integrations.map((integration) => (
                    <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        onConnect={() => onConnect(integration.id)}
                        onDisconnect={() => onDisconnect(integration.id)}
                    />
                ))}
            </div>
        </div>
    );
};

// ── Integration Card ──

interface IntegrationCardProps {
    integration: Integration;
    onConnect: () => void;
    onDisconnect: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
    integration,
    onConnect,
    onDisconnect,
}) => {
    const [hov, setHov] = useState(false);

    return (
        <div
            className={`integration-card ${integration.connected ? "is-connected" : ""}`}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
        >
            <div className="integration-icon-wrap">
                <Ico type={integration.icon} size={20} color={integration.connected ? T.accent : T.muted} />
            </div>

            <div className="integration-info">
                <div className="integration-name">{integration.name}</div>
                <div className="integration-desc">{integration.description}</div>
                {integration.connected && integration.lastSync && (
                    <div className="integration-sync">
                        <div className="sync-dot" />
                        <span className="sync-text">Last sync: {integration.lastSync}</span>
                    </div>
                )}
            </div>

            <div className="integration-action">
                {integration.connected ? (
                    <button
                        className={`integration-btn is-disconnect ${hov ? "is-hovered" : ""}`}
                        onClick={onDisconnect}
                    >
                        {hov ? "Disconnect" : "Connected"}
                    </button>
                ) : (
                    <button className="integration-btn is-connect" onClick={onConnect}>
                        Connect
                    </button>
                )}
            </div>
        </div>
    );
};
