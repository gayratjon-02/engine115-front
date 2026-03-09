import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { IntegrationsSection } from "../../libs/components/integrations/IntegrationsSection";
import type { Integration } from "../../libs/components/integrations/IntegrationsSection";
import { INTEGRATIONS_INIT } from "../../libs/data/mockData";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

const IntegrationsPage: NextPage = () => {
    const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS_INIT);

    const handleConnect = (id: string) => {
        setIntegrations((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, connected: true, lastSync: "Just now" } : i,
            ),
        );
    };

    const handleDisconnect = (id: string) => {
        setIntegrations((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, connected: false, lastSync: undefined } : i,
            ),
        );
    };

    return (
        <>
            <Head>
                <title>Integrations | Engine115</title>
            </Head>
            <div className="integrations-page">
                <IntegrationsSection
                    integrations={integrations}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                />
            </div>
        </>
    );
};

export default withLayoutBasic(IntegrationsPage);
