"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Globe, TrendingUp, HandHeart, Leaf } from 'lucide-react';
import { toast } from 'sonner';
import Loading from '@/components/Loading';

const ImpactPage = () => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <span className="px-4 py-2 rounded-full glass text-blue-400 text-sm font-medium mb-6 inline-block">
                        Creating Positive Change
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Impact</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Beyond connecting services, we're building a stronger community. empowering local professionals and ensuring sustainable growth for everyone.
                    </p>
                </motion.div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        {
                            icon: Users,
                            value: "50,000+",
                            label: "Lives Touched",
                            desc: "Customers and providers connected.",
                            color: "text-blue-400",
                            bg: "bg-blue-500/10"
                        },
                        {
                            icon: TrendingUp,
                            value: "৳10M+",
                            label: "Earnings Generated",
                            desc: "Direct income for local pros.",
                            color: "text-purple-400",
                            bg: "bg-purple-500/10"
                        },
                        {
                            icon: Globe,
                            value: "64",
                            label: "Districts Covered",
                            desc: "Serving communities nationwide.",
                            color: "text-indigo-400",
                            bg: "bg-indigo-500/10"
                        }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-8 rounded-[32px] border-white/5 hover:border-white/10 transition-all text-center group"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                            <p className="text-lg font-bold text-slate-200 mb-2">{stat.label}</p>
                            <p className="text-slate-400 text-sm">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Stories Section */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-center mb-16">Real Stories, Real Change</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass rounded-[32px] overflow-hidden group"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1470&auto=format&fit=crop"
                                    alt="Success Story"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">Provider Story</span>
                                    <h3 className="text-2xl font-bold text-white">Rahim's Journey</h3>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-300 leading-relaxed mb-6">
                                    "I started as a freelance electrician with just a few clients. Fixora helped me build a full team and now I manage major projects across the city. It changed my family's life."
                                </p>
                                <div className="flex items-center gap-2 text-blue-400 font-bold">
                                    <HandHeart className="w-5 h-5" />
                                    <span>Economic Empowerment</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass rounded-[32px] overflow-hidden group"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1469&auto=format&fit=crop"
                                    alt="Community Impact"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">Community</span>
                                    <h3 className="text-2xl font-bold text-white">Green Initiatives</h3>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-300 leading-relaxed mb-6">
                                    "Through the platform, we've connected eco-friendly cleaning services with thousands of homes, reducing chemical usage and promoting a healthier environment."
                                </p>
                                <div className="flex items-center gap-2 text-purple-400 font-bold">
                                    <Leaf className="w-5 h-5" />
                                    <span>Environmental Impact</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass rounded-[40px] p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
                    <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of the Story</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                        Every service booked, every review written, and every professional hired contributes to this ecosystem of growth.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => toast.success("Welcome to the community! We'll be in touch soon.")}
                            className="px-8 py-4 gradient-bg rounded-xl font-bold text-white hover-glow transition-all"
                        >
                            Join the Community
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ImpactPage;
