import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { IntegrationsSection } from "../../libs/components/integrations/IntegrationsSection";
import type { Integration } from "../../libs/components/integrations/IntegrationsSection";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { getUserBrands } from "../../api/brand/GET/brand";
import { getIntegrationsStatus, redirectToShopifyAuth } from "../../api/shopify/GET/shopify";
import { disconnectPlatform } from "../../api/shopify/POST/shopify";
import { PLATFORM } from "../../libs/enums/shopify.enum";

const INTEGRATIONS_DEFAULT: Integration[] = [
    { id: "shopify", name: "Shopify", icon: "box", description: "Sync orders, products, and customer data", connected: false },
    { id: "meta", name: "Meta Ads", icon: "image", description: "Facebook & Instagram ad performance", connected: false },
    { id: "google-ads", name: "Google Ads", icon: "google", description: "Search, display, and shopping campaigns", connected: false },
    { id: "tiktok", name: "TikTok Ads", icon: "play", description: "TikTok ad spend and conversions", connected: false },
    { id: "klaviyo", name: "Klaviyo", icon: "mail", description: "Email & SMS marketing attribution", connected: false },
    { id: "google-analytics", name: "Google Analytics", icon: "chart", description: "Website traffic and behavior data", connected: false },
];

const PLATFORM_MAP: Record<string, PLATFORM> = {
    shopify: PLATFORM.SHOPIFY,
    meta: PLATFORM.META,
    "google-ads": PLATFORM.GOOGLE,
    tiktok: PLATFORM.TIKTOK,
};

const IntegrationsPage: NextPage = () => {
    const router = useRouter();
    const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS_DEFAULT);
    const [brandId, setBrandId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchIntegrations = useCallback(async (bId: string) => {
        try {
            const res = await getIntegrationsStatus(bId);
            setIntegrations((prev) =>
                prev.map((item) => {
                    const match = res.integrations.find(
                        (int) => int.platform === PLATFORM_MAP[item.id],
                    );
                    if (!match) return { ...item, connected: false, lastSync: undefined };
                    const isConnected = match.status === "ACTIVE";
                    return {
                        ...item,
                        connected: isConnected,
                        lastSync: match.lastSyncedAt
                            ? formatSyncTime(match.lastSyncedAt)
                            : undefined,
                    };
                }),
            );
        } catch {
            setIntegrations(INTEGRATIONS_DEFAULT);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const brands = await getUserBrands();
                if (brands.length > 0) {
                    setBrandId(brands[0].id);
                    await fetchIntegrations(brands[0].id);
                } else {
                    setLoading(false);
                }
            } catch {
                setLoading(false);
            }
        })();
    }, [fetchIntegrations]);

    useEffect(() => {
        if (router.query.shopify === "connected" && brandId) {
            fetchIntegrations(brandId);
        }
    }, [router.query, brandId, fetchIntegrations]);

    const handleConnect = async (id: string) => {
        if (!brandId) return;

        if (id === "shopify") {
            const shop = prompt("Shopify domain kiriting (masalan: mystore.myshopify.com):");
            if (!shop) return;
            redirectToShopifyAuth(brandId, shop);
            return;
        }
    };

    const handleDisconnect = async (id: string) => {
        if (!brandId) return;
        const platform = PLATFORM_MAP[id];
        if (!platform) return;

        setLoading(true);
        try {
            await disconnectPlatform(brandId, { platform });
            setIntegrations((prev) =>
                prev.map((i) =>
                    i.id === id ? { ...i, connected: false, lastSync: undefined } : i,
                ),
            );
        } catch {
            alert("Disconnect failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Integrations | Engine115</title>
            </Head>
            <div className="integrations-page">
                <IntegrationsSection
                    integrations={integrations}
                    loading={loading}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                />
            </div>
        </>
    );
};

function formatSyncTime(isoDate: string): string {
    const diff = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

export default withLayoutBasic(IntegrationsPage);
