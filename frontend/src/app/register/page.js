"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, UserPlus, AlertCircle, CheckCircle2, UserCircle } from 'lucide-react';
import Link from 'next/link';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 glass p-10 rounded-[32px] border-white/10 shadow-2xl relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl"></div>

                <div className="text-center relative">
                    <h2 className="text-3xl font-extrabold text-white mb-2 underline decoration-blue-500 underline-offset-8">Join Fixora</h2>
                    <p className="text-slate-400 mt-4">Create an account to start listing your services</p>
                </div>

                {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3 text-emerald-400 animate-fade-in">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        Registration successful! Redirecting to login...
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm animate-shake">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-5" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        {/* Role Selector */}
                        <div className="relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Register As</label>
                            <div className="relative">
                                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="block w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer bg-[#1e293b]"
                                >
                                    <option value="user" className="bg-slate-900 text-white">Visitor / Normal User</option>
                                    <option value="provider" className="bg-slate-900 text-white">Service Provider</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Confirm</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="group relative w-full flex justify-center py-4 px-4 border border-transparent font-bold rounded-2xl text-white gradient-bg hover-glow transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <UserPlus className="h-5 w-5 text-indigo-200 group-hover:text-white transition-colors" />
                        </span>
                        {loading ? 'Creating Account...' : 'Create Free Account'}
                    </button>

                    <div className="text-center text-sm">
                        <p className="text-slate-400">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-blue-400 hover:text-blue-300">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
