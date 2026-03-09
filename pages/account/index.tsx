import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { T } from "../../libs/theme/theme";
import { Ico } from "../../libs/components/common/Ico";
import { getAuthUser } from "../../api/user/GET/auth";
import { logoutUser } from "../../api/user/POST/auth";
import { isLoggedIn } from "../../libs/api";
import type { User } from "../../libs/types/user/user";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

const AccountPage: NextPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    // ── Secure Guard: redirect if not logged in ──
    useEffect(() => {
        if (!isLoggedIn()) {
            router.replace("/account/join");
            return;
        }

        getAuthUser()
            .then(setUser)
            .catch(() => {
                // Token invalid or expired → force logout
                logoutUser();
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        setLoggingOut(true);
        // Small delay for UX, then clear token & redirect
        setTimeout(() => {
            logoutUser(); // clears localStorage token + redirects to /account/join
        }, 300);
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

    return (
        <>
            <Head>
                <title>Account | Engine115</title>
            </Head>
            <div className="account-page">
                {/* Header */}
                <div className="account-header">
                    <div className="account-avatar">
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="avatar-img" />
                        ) : (
                            <div className="avatar-placeholder">
                                <Ico type="user" size={28} color={T.muted} />
                            </div>
                        )}
                    </div>
                    <div className="account-info">
                        <div className="account-name">{user?.name || "—"}</div>
                        <div className="account-email">{user?.email || "—"}</div>
                        <div className="account-role">{user?.role?.toUpperCase() ?? "USER"}</div>
                    </div>
                </div>

                {/* Logout */}
                <div className="account-section">
                    <button
                        className={`logout-btn ${loggingOut ? "is-loading" : ""}`}
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        <Ico type="logout" size={16} color={loggingOut ? T.muted : T.red} />
                        <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
                    </button>
                    <p className="logout-note">
                        You will be redirected to the login page. Your session will be fully cleared.
                    </p>
                </div>
            </div>
        </>
    );
};

export default withLayoutBasic(AccountPage);
