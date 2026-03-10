import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { T } from "../../libs/theme/theme";
import { Ico } from "../../libs/components/common/Ico";
import { getAuthUser } from "../../api/user/GET/auth";
import { logoutUser } from "../../api/user/POST/auth";
import { isLoggedIn } from "../../libs/api";
import { getCurrentPlan } from "../../api/subscription/GET/subscription";
import { upgradePlan, cancelPlan } from "../../api/subscription/POST/subscription";
import { SUBSCRIPTION_PLAN, PLAN_STATUS } from "../../libs/enums/subscription.enum";
import type { User } from "../../libs/types/user/user";
import type { SubscriptionDto } from "../../libs/types/subscription/subscription.dto";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

const PLANS = [
    {
        id: SUBSCRIPTION_PLAN.FREE,
        name: "Free",
        price: 0,
        features: ["Dashboard overview", "P&L tracking", "Shopify integration", "Basic metrics"],
    },
    {
        id: SUBSCRIPTION_PLAN.PRO,
        name: "Pro",
        price: 99,
        popular: true,
        features: ["Everything in Free", "AI Creative Analysis", "LTV Cohort tracking", "Meta Ads integration", "Priority support"],
    },
    {
        id: SUBSCRIPTION_PLAN.AGENCY,
        name: "Agency",
        price: 299,
        features: ["Everything in Pro", "Unlimited brands", "Google Ads integration", "White-label reports", "Dedicated account manager"],
    },
];

const AccountPage: NextPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [subscription, setSubscription] = useState<SubscriptionDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);
    const [upgrading, setUpgrading] = useState<string | null>(null);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        if (!isLoggedIn()) {
            router.replace("/account/join");
            return;
        }

        Promise.all([
            getAuthUser(),
            getCurrentPlan().catch(() => null),
        ])
            .then(([userData, subData]) => {
                setUser(userData);
                setSubscription(subData);
            })
            .catch(() => logoutUser())
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        setLoggingOut(true);
        setTimeout(() => logoutUser(), 300);
    };

    const handleUpgrade = async (plan: SUBSCRIPTION_PLAN) => {
        setUpgrading(plan);
        try {
            const res = await upgradePlan({ plan });
            setSubscription(res);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Upgrade failed";
            alert(msg);
        } finally {
            setUpgrading(null);
        }
    };

    const handleCancel = async () => {
        if (!confirm("Are you sure you want to cancel your subscription?")) return;
        setCancelling(true);
        try {
            const res = await cancelPlan();
            setSubscription(res);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Cancel failed";
            alert(msg);
        } finally {
            setCancelling(false);
        }
    };

    if (loading) {
        return (
            <div className="account-page">
                <div className="account-loading">
                    <Ico type="zap" size={20} color={T.accent} />
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    const currentPlan = subscription?.plan ?? SUBSCRIPTION_PLAN.FREE;
    const planStatus = subscription?.status ?? PLAN_STATUS.ACTIVE;
    const planRank = { free: 0, pro: 1, agency: 2 };

    return (
        <>
            <Head>
                <title>Account | Engine115</title>
            </Head>
            <div className="account-page">
                <div className="account-header">
                    <div className="account-avatar">
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="avatar-img" />
                        ) : (
                            <div className="avatar-placeholder">
                                {(user?.name?.[0] ?? "U").toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="account-info">
                        <div className="account-name">{user?.name || "—"}</div>
                        <div className="account-email">{user?.email || "—"}</div>
                        <div className="account-meta">
                            <span className="account-role">{user?.role?.toUpperCase() ?? "USER"}</span>
                            <span className={`account-plan-badge plan-${currentPlan}`}>
                                {currentPlan.toUpperCase()}
                            </span>
                            {planStatus === PLAN_STATUS.CANCELLED && (
                                <span className="account-status-badge is-cancelled">CANCELLED</span>
                            )}
                        </div>
                    </div>
                    <button
                        className={`logout-btn-compact ${loggingOut ? "is-loading" : ""}`}
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        <Ico type="logout" size={16} color={loggingOut ? T.muted : T.red} />
                        <span>{loggingOut ? "..." : "Sign Out"}</span>
                    </button>
                </div>

                <div className="plans-section">
                    <div className="plans-header">
                        <div className="plans-title">Plans</div>
                        <div className="plans-subtitle">Choose the plan that fits your business</div>
                    </div>

                    <div className="plans-grid">
                        {PLANS.map((plan) => {
                            const isCurrent = plan.id === currentPlan;
                            const isLower = planRank[plan.id] < planRank[currentPlan];
                            const isUpgrading = upgrading === plan.id;

                            return (
                                <div
                                    key={plan.id}
                                    className={`plan-card ${isCurrent ? "is-current" : ""} ${plan.popular ? "is-popular" : ""}`}
                                >
                                    {plan.popular && <div className="plan-popular-tag">Most Popular</div>}
                                    <div className="plan-name">{plan.name}</div>
                                    <div className="plan-price">
                                        <span className="price-amount">${plan.price}</span>
                                        <span className="price-period">/mo</span>
                                    </div>
                                    <ul className="plan-features">
                                        {plan.features.map((f) => (
                                            <li key={f}>
                                                <Ico type="check" size={12} color={isCurrent ? T.accent : T.dim} />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="plan-action">
                                        {isCurrent ? (
                                            currentPlan !== SUBSCRIPTION_PLAN.FREE && planStatus === PLAN_STATUS.ACTIVE ? (
                                                <button
                                                    className="plan-btn is-cancel"
                                                    onClick={handleCancel}
                                                    disabled={cancelling}
                                                >
                                                    {cancelling ? "Cancelling..." : "Cancel Plan"}
                                                </button>
                                            ) : (
                                                <div className="plan-btn is-current">Current Plan</div>
                                            )
                                        ) : isLower ? (
                                            <div className="plan-btn is-disabled">—</div>
                                        ) : (
                                            <button
                                                className="plan-btn is-upgrade"
                                                onClick={() => handleUpgrade(plan.id)}
                                                disabled={!!upgrading}
                                            >
                                                {isUpgrading ? "Upgrading..." : `Upgrade to ${plan.name}`}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {subscription?.currentPeriodEnd && planStatus === PLAN_STATUS.ACTIVE && currentPlan !== SUBSCRIPTION_PLAN.FREE && (
                        <div className="plan-period-note">
                            Current period ends {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default withLayoutBasic(AccountPage);
