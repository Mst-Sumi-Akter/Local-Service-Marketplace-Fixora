"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, UserCheck, Calendar, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Loading from '@/components/Loading';

const HowItWorksPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) return <Loading message="Loading How It Works..." />;

    const steps = [
        {
            icon: Search,
            title: 'Search for Services',
            description: 'Browse through our extensive catalog of local services. Use filters to find exactly what you need.',
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20'
        },
        {
            icon: UserCheck,
            title: 'Choose Your Provider',
            description: 'Review profiles, ratings, and prices. Select the professional that best fits your requirements.',
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20'
        },
        {
            icon: Calendar,
            title: 'Book Appointment',
            description: 'Schedule a convenient time and confirm your booking. Get instant confirmation from the provider.',
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20'
        },
        {
            icon: CheckCircle,
            title: 'Get It Done',
            description: 'The professional arrives on time and completes the work. Pay securely after you\'re satisfied.',
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20'
        }
    ];

    const forProviders = [
        { title: 'Create Your Profile', desc: 'Sign up and showcase your skills, experience, and portfolio.' },
        { title: 'Get Verified', desc: 'Complete our verification process to build trust with customers.' },
        { title: 'Receive Bookings', desc: 'Get notified when customers book your services.' },
        { title: 'Earn & Grow', desc: 'Complete jobs, earn money, and build your reputation.' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Simple & Straightforward</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-6">
                    How <span className="gradient-text">Fixora</span> Works
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    Getting quality local services has never been easier. Follow these simple steps to get started.
                </p>
            </motion.div>

            {/* For Customers */}
            <div className="mb-32">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-center mb-16"
                >
                    For Customers
                </motion.h2>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-yellow-500/20 -z-10"></div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="relative"
                            >
                                <div className="glass p-8 rounded-3xl border-white/5 hover:border-white/10 transition-all h-full">
                                    {/* Step Number */}
                                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-black text-lg shadow-lg">
                                        {idx + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center mb-6`}>
                                        <step.icon className={`w-8 h-8 ${step.color}`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 gradient-bg rounded-xl font-bold text-white hover-glow transition-all">
                        Browse Services Now <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>

            {/* For Service Providers */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="glass p-12 md:p-16 rounded-[40px] border-white/5"
            >
                <h2 className="text-4xl font-bold text-center mb-4">For Service Providers</h2>
                <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
                    Join thousands of professionals earning on Fixora. Start your journey today.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {forProviders.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                            <div className="w-10 h-10 shrink-0 rounded-full gradient-bg flex items-center justify-center font-bold">
                                {idx + 1}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-slate-300 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 glass border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">
                        Register as Provider <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default HowItWorksPage;
