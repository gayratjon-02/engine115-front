import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { T, fonts } from '../../libs/theme/theme';
import { Ico } from '../../libs/components/common/Ico';

const Join: NextPage = () => {
    const router = useRouter();
    const [loginView, setLoginView] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleInput = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!loginView && !form.name.trim()) newErrors.name = 'Full name is required';

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';

        if (!loginView) {
            if (form.password.length < 8) newErrors.password = 'Min 8 characters';
            else if (!/(?=.*[a-z])/.test(form.password)) newErrors.password = 'Need lowercase';
            else if (!/(?=.*[A-Z])/.test(form.password)) newErrors.password = 'Need uppercase';
            else if (!/(?=.*\d)/.test(form.password)) newErrors.password = 'Need a number';
            else if (!/(?=.*[!@#$%^&*-])/.test(form.password)) newErrors.password = 'Need special char';

            if (form.password !== form.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            router.push('/');
        }, 1000);
    };

    return (
        <>
            <Head>
                <title>{loginView ? 'Sign In' : 'Sign Up'} | Engine115</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: T.bg,
                    color: T.text,
                    fontFamily: fonts.sans,
                    padding: 24,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Background Ambient Glows */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '15%',
                        width: 500,
                        height: 500,
                        background: T.accent,
                        filter: 'blur(150px)',
                        opacity: 0.12,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '15%',
                        width: 500,
                        height: 500,
                        background: T.blue,
                        filter: 'blur(150px)',
                        opacity: 0.12,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }}
                />

                {/* Authentication Card */}
                <div
                    style={{
                        width: '100%',
                        maxWidth: 440,
                        background: T.bgCard,
                        border: `1px solid ${T.borderHover}`,
                        borderRadius: 24,
                        padding: '48px 36px',
                        boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                        position: 'relative',
                        zIndex: 10,
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Logo Handle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: T.accentGlow,
                                border: `1px solid ${T.accent}30`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Ico type="zap" size={20} color={T.accent} />
                        </div>
                        <span style={{ fontSize: 24, fontWeight: 800, fontFamily: fonts.mono, letterSpacing: '-0.02em', color: T.text }}>
                            Engine115
                        </span>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px 0', color: T.text }}>
                            {loginView ? 'Welcome back' : 'Create an account'}
                        </h1>
                        <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>
                            {loginView
                                ? 'Enter your credentials to access your dashboard'
                                : 'Start analyzing and optimizing your data today'}
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                        <button
                            type="button"
                            style={{
                                width: '100%',
                                background: T.bgInput,
                                border: `1px solid ${T.border}`,
                                borderRadius: 12,
                                padding: '12px 16px',
                                color: T.text,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = T.bgHover)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = T.bgInput)}
                        >
                            <Ico type="google" size={18} />
                            Continue with Google
                        </button>
                        <button
                            type="button"
                            style={{
                                width: '100%',
                                background: T.bgInput,
                                border: `1px solid ${T.border}`,
                                borderRadius: 12,
                                padding: '12px 16px',
                                color: T.text,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = T.bgHover)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = T.bgInput)}
                        >
                            <Ico type="apple" size={18} color={T.text} />
                            Continue with Apple
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <div style={{ flex: 1, height: 1, background: T.border }} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: T.muted, fontFamily: fonts.mono }}>OR</span>
                        <div style={{ flex: 1, height: 1, background: T.border }} />
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {!loginView && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label style={{ fontSize: 11, fontWeight: 600, color: T.dim, fontFamily: fonts.mono }}>FULL NAME</label>
                                    {errors.name && <span style={{ fontSize: 11, color: T.red, fontWeight: 600, fontFamily: fonts.mono }}>{errors.name}</span>}
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Ico type="users" size={14} color={T.muted} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        value={form.name}
                                        onChange={(e) => handleInput('name', e.target.value)}
                                        style={{
                                            width: '100%', background: T.bgInput, border: `1px solid ${errors.name ? T.red : T.border}`,
                                            borderRadius: 12, padding: '14px 16px 14px 42px', color: T.text, fontSize: 14, outline: 'none', transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => { if (!errors.name) e.target.style.borderColor = T.accent; }}
                                        onBlur={(e) => { if (!errors.name) e.target.style.borderColor = T.border; }}
                                    />
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label style={{ fontSize: 11, fontWeight: 600, color: T.dim, fontFamily: fonts.mono }}>EMAIL ADDRESS</label>
                                {errors.email && <span style={{ fontSize: 11, color: T.red, fontWeight: 600, fontFamily: fonts.mono }}>{errors.email}</span>}
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Ico type="mail" size={14} color={T.muted} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={form.email}
                                    onChange={(e) => handleInput('email', e.target.value)}
                                    style={{
                                        width: '100%', background: T.bgInput, border: `1px solid ${errors.email ? T.red : T.border}`,
                                        borderRadius: 12, padding: '14px 16px 14px 42px', color: T.text, fontSize: 14, outline: 'none', transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => { if (!errors.email) e.target.style.borderColor = T.accent; }}
                                    onBlur={(e) => { if (!errors.email) e.target.style.borderColor = T.border; }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <label style={{ fontSize: 11, fontWeight: 600, color: T.dim, fontFamily: fonts.mono }}>PASSWORD</label>
                                    {errors.password && <span style={{ fontSize: 11, color: T.red, fontWeight: 600, fontFamily: fonts.mono }}>{errors.password}</span>}
                                </div>
                                {loginView && (
                                    <span style={{ fontSize: 11, color: T.accent, cursor: 'pointer', fontFamily: fonts.sans, fontWeight: 600 }}>
                                        Forgot password?
                                    </span>
                                )}
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Ico type="lock" size={14} color={T.muted} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => handleInput('password', e.target.value)}
                                    style={{
                                        width: '100%', background: T.bgInput, border: `1px solid ${errors.password ? T.red : T.border}`,
                                        borderRadius: 12, padding: '14px 16px 14px 42px', color: T.text, fontSize: 14, outline: 'none', transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => { if (!errors.password) e.target.style.borderColor = T.accent; }}
                                    onBlur={(e) => { if (!errors.password) e.target.style.borderColor = T.border; }}
                                />
                            </div>
                        </div>

                        {!loginView && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label style={{ fontSize: 11, fontWeight: 600, color: T.dim, fontFamily: fonts.mono }}>CONFIRM PASSWORD</label>
                                    {errors.confirmPassword && <span style={{ fontSize: 11, color: T.red, fontWeight: 600, fontFamily: fonts.mono }}>{errors.confirmPassword}</span>}
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Ico type="lock" size={14} color={T.muted} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={form.confirmPassword}
                                        onChange={(e) => handleInput('confirmPassword', e.target.value)}
                                        style={{
                                            width: '100%', background: T.bgInput, border: `1px solid ${errors.confirmPassword ? T.red : T.border}`,
                                            borderRadius: 12, padding: '14px 16px 14px 42px', color: T.text, fontSize: 14, outline: 'none', transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => { if (!errors.confirmPassword) e.target.style.borderColor = T.accent; }}
                                        onBlur={(e) => { if (!errors.confirmPassword) e.target.style.borderColor = T.border; }}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !form.email || !form.password || (!loginView && (!form.name || !form.confirmPassword))}
                            style={{
                                width: '100%', marginTop: 12, background: T.grad, border: 'none', borderRadius: 12, padding: '14px 24px',
                                color: '#000', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: (loading || !form.email || !form.password || (!loginView && (!form.name || !form.confirmPassword))) ? 0.7 : 1,
                                transition: 'opacity 0.2s, transform 0.1s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                            }}
                            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
                            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {loading ? (
                                <span>Wait...</span>
                            ) : (
                                <>
                                    {loginView ? 'Sign In' : 'Create Account'}
                                    <Ico type="rightup" size={14} color="#000" />
                                </>
                            )}
                        </button>
                    </form>

                    <div style={{ marginTop: 32, textAlign: 'center', fontSize: 13, color: T.muted }}>
                        {loginView ? "Don't have an account yet?" : 'Already have an account?'}
                        {' '}
                        <span
                            onClick={() => {
                                setLoginView(!loginView);
                                setErrors({});
                                setForm({ name: '', email: '', password: '', confirmPassword: '' });
                            }}
                            style={{ color: T.accent, fontWeight: 600, cursor: 'pointer', display: 'inline-block' }}
                        >
                            {loginView ? 'Sign up' : 'Log in'}
                        </span>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Join;