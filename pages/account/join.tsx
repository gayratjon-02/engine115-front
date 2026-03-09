import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { T } from '../../libs/theme/theme';
import { Ico } from '../../libs/components/common/Ico';
import { loginUser, registerUser } from '../../api/user/POST/auth';

const Join: NextPage = () => {
    const router = useRouter();
    const [loginView, setLoginView] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const handleInput = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
        if (serverError) setServerError('');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setServerError('');

        try {
            if (loginView) {
                await loginUser({ email: form.email, password: form.password });
            } else {
                await registerUser({ email: form.email, password: form.password, name: form.name });
            }
            router.push('/');
        } catch (err: any) {
            setServerError(err?.message ?? 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>{loginView ? 'Sign In' : 'Sign Up'} | Engine115</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="join-page">
                {/* Background Ambient Glows */}
                <div className="ambient-glow glow-accent" />
                <div className="ambient-glow glow-blue" />

                {/* Authentication Card */}
                <div className="auth-card">
                    {/* Logo Handle */}
                    <div className="logo-wrap">
                        <div className="logo-icon">
                            <Ico type="zap" size={20} color={T.accent} />
                        </div>
                        <span className="logo-text">Engine115</span>
                    </div>

                    <div className="auth-header">
                        <h1 className="auth-title">
                            {loginView ? 'Welcome back' : 'Create an account'}
                        </h1>
                        <p className="auth-subtitle">
                            {loginView
                                ? 'Enter your credentials to access your dashboard'
                                : 'Start analyzing and optimizing your data today'}
                        </p>
                    </div>

                    <div className="social-btn-wrap">
                        <button type="button" className="social-btn">
                            <Ico type="google" size={18} />
                            Continue with Google
                        </button>
                        <button type="button" className="social-btn">
                            <Ico type="apple" size={18} color={T.text} />
                            Continue with Apple
                        </button>
                    </div>

                    <div className="divider-wrap">
                        <div className="divider-line" />
                        <span className="divider-text">OR</span>
                        <div className="divider-line" />
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {!loginView && (
                            <div className="input-group">
                                <div className="label-row">
                                    <label className="input-label">FULL NAME</label>
                                    {errors.name && <span className="error-text">{errors.name}</span>}
                                </div>
                                <div className="input-wrap">
                                    <span className="input-icon">
                                        <Ico type="users" size={14} color={T.muted} />
                                    </span>
                                    <input
                                        type="text"
                                        className={errors.name ? 'has-error' : ''}
                                        placeholder="e.g. John Doe"
                                        value={form.name}
                                        onChange={(e) => handleInput('name', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="input-group">
                            <div className="label-row">
                                <label className="input-label">EMAIL ADDRESS</label>
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            <div className="input-wrap">
                                <span className="input-icon">
                                    <Ico type="mail" size={14} color={T.muted} />
                                </span>
                                <input
                                    type="email"
                                    className={errors.email ? 'has-error' : ''}
                                    placeholder="name@company.com"
                                    value={form.email}
                                    onChange={(e) => handleInput('email', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="label-row">
                                <div className="label-error-row">
                                    <label className="input-label">PASSWORD</label>
                                    {errors.password && <span className="error-text">{errors.password}</span>}
                                </div>
                                {loginView && (
                                    <span className="forgot-link">Forgot password?</span>
                                )}
                            </div>
                            <div className="input-wrap">
                                <span className="input-icon">
                                    <Ico type="lock" size={14} color={T.muted} />
                                </span>
                                <input
                                    type="password"
                                    className={errors.password ? 'has-error' : ''}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => handleInput('password', e.target.value)}
                                />
                            </div>
                        </div>

                        {!loginView && (
                            <div className="input-group">
                                <div className="label-row">
                                    <label className="input-label">CONFIRM PASSWORD</label>
                                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                                </div>
                                <div className="input-wrap">
                                    <span className="input-icon">
                                        <Ico type="lock" size={14} color={T.muted} />
                                    </span>
                                    <input
                                        type="password"
                                        className={errors.confirmPassword ? 'has-error' : ''}
                                        placeholder="••••••••"
                                        value={form.confirmPassword}
                                        onChange={(e) => handleInput('confirmPassword', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {serverError && (
                            <div className="server-error">{serverError}</div>
                        )}

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading || !form.email || !form.password || (!loginView && (!form.name || !form.confirmPassword))}
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

                    <div className="switch-view">
                        {loginView ? "Don't have an account yet?" : 'Already have an account?'}
                        <span
                            className="switch-link"
                            onClick={() => {
                                setLoginView(!loginView);
                                setErrors({});
                                setForm({ name: '', email: '', password: '', confirmPassword: '' });
                            }}
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