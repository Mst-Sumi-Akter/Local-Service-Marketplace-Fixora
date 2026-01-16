"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Star, Zap, ShieldCheck, TrendingUp, Gem, Award } from 'lucide-react';
import { toast } from 'sonner';
import Loading from '@/components/Loading';

const ProMembershipPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) return <Loading message="Loading Premium Experience..." />;

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-400 text-sm font-bold mb-8 animate-pulse">
                        <Crown className="w-4 h-4" />
                        PREMIUM MEMBERSHIP
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                        Unlock Your Full <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 drop-shadow-sm">
                            Potential
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Join the elite tier of service providers. Get exclusive access to high-value leads, premium badges, and advanced business tools.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Benefits List */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-bold mb-8">Why Go Pro?</h2>
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Verified Trust Badge",
                                desc: "Stand out with a gold verification badge that tells customers you're a trusted professional.",
                                color: "text-blue-400"
                            },
                            {
                                icon: TrendingUp,
                                title: "10x More Visibility",
                                desc: "Your profile appears at the top of search results, guaranteed to get you more views.",
                                color: "text-purple-400"
                            },
                            {
                                icon: Zap,
                                title: "Priority Lead Access",
                                desc: "Get notified about new jobs 30 minutes before free users.",
                                color: "text-indigo-400"
                            },
                            {
                                icon: Gem,
                                title: "Zero Commission",
                                desc: "Keep 100% of your earnings. We don't take a cut from Pro members.",
                                color: "text-cyan-400"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                                <div className={`w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-[40px] blur opacity-30 animate-pulse"></div>

                        <div className="relative glass bg-[#12121a]/90 backdrop-blur-xl p-8 md:p-12 rounded-[40px] border border-blue-500/20 shadow-2xl overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-sm font-bold text-blue-400 tracking-wider mb-2">PRO PLAN</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-white">৳999</span>
                                        <span className="text-slate-400">/mo</span>
                                    </div>
                                    <p className="text-slate-500 text-sm mt-2">Billed monthly</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 shadow-lg shadow-purple-500/20">
                                    <Crown className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

                            <div className="space-y-4 mb-10">
                                {[
                                    "Unlimited Service Listings",
                                    "Analytics Dashboard",
                                    "Direct Client Messaging",
                                    "Custom Cover Image",
                                    "Priority Support 24/7"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-blue-400" />
                                        </div>
                                        <span className="text-slate-300 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => toast.success("Redirecting to payment gateway...")}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Upgrade to Pro
                                    <Zap className="w-5 h-5 group-hover:fill-current transition-all" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>

                            <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
                                <ShieldCheck className="w-3 h-3" />
                                30-day money-back guarantee
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProMembershipPage;
