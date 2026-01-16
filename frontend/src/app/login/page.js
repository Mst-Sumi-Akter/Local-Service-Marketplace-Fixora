"use client";
import React, { useState } from 'react';
import { setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, AlertCircle, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    role // Send selected role for validation
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Set Cookies
            setCookie(null, 'auth_token', 'token-' + data.id, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
            setCookie(null, 'user_role', data.role, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
            setCookie(null, 'user_name', data.name, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            toast.success(`Logged in as ${data.name}`);

            if (data.role === 'provider' || data.role === 'admin') {
                router.push('/dashboard'); // Assuming dashboard exists or revert to /add-service if requested, existing logic said /add-service for provider/admin
            } else {
                router.push('/');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 glass p-10 rounded-[32px] border-white/10 shadow-2xl relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>

                <div className="text-center relative">
                    <h2 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h2>
                    <p className="text-slate-400">Log in to manage your services</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm animate-shake">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        {/* Role Selector */}
                        <div className="relative">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block ml-1">Login As</label>
                            <div className="relative">
                                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <select
                                    value={role}
                                    onChange={(e) => {
                                        const selectedRole = e.target.value;
                                        setRole(selectedRole);
                                        // Auto-fill credentials based on role
                                        if (selectedRole === 'user') {
                                            setEmail('user@gmail.com');
                                            setPassword('password123');
                                        } else if (selectedRole === 'provider') {
                                            setEmail('provider@gmail.com');
                                            setPassword('password123');
                                        } else if (selectedRole === 'admin') {
                                            setEmail('admin@gmail.com');
                                            setPassword('password123');
                                        }
                                    }}
                                    className="block w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer bg-[#1e293b]"
                                >
                                    <option value="user" className="bg-slate-900 text-white">Visitor / Normal User</option>
                                    <option value="provider" className="bg-slate-900 text-white">Service Provider</option>
                                    <option value="admin" className="bg-slate-900 text-white">Super Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-4 px-4 border border-transparent font-bold rounded-2xl text-white gradient-bg hover-glow transition-all active:scale-[0.98] disabled:opacity-70"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LogIn className="h-5 w-5 text-indigo-200 group-hover:text-white transition-colors" />
                        </span>
                        {loading ? 'Logging in...' : 'Sign in to Account'}
                    </button>

                    <div className="text-center text-sm">
                        <p className="text-slate-400">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-bold text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4">
                                Create an Account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
