"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Shield, Zap } from 'lucide-react';
import Loading from '@/components/Loading';

const AboutPage = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-5xl md:text-6xl font-black mb-6">
                    About <span className="gradient-text">Fixora</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    We're on a mission to connect skilled local professionals with people who need quality services. Building trust, one service at a time.
                </p>
            </motion.div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass p-10 rounded-[40px] border-white/5"
                >
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-slate-300 leading-relaxed">
                        To empower local service providers and make quality home services accessible to everyone. We believe in creating opportunities for skilled professionals while ensuring customers receive exceptional service every time.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass p-10 rounded-[40px] border-white/5"
                >
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-slate-300 leading-relaxed">
                        To become the most trusted platform for local services, where quality meets convenience. We envision a future where finding reliable help for any task is just a click away.
                    </p>
                </motion.div>
            </div>

            {/* Core Values */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-20"
            >
                <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Shield, title: 'Trust & Safety', desc: 'Every professional is verified and background-checked for your peace of mind.' },
                        { icon: Award, title: 'Quality First', desc: 'We maintain the highest standards and only work with the best in the business.' },
                        { icon: Zap, title: 'Fast & Reliable', desc: 'Quick response times and dependable service, every single time.' }
                    ].map((value, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="glass p-8 rounded-3xl border-white/5 text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                                <value.icon className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass p-12 rounded-[40px] border-white/5"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { number: '10,000+', label: 'Service Providers' },
                        { number: '50,000+', label: 'Happy Customers' },
                        { number: '100+', label: 'Service Categories' },
                        { number: '99%', label: 'Satisfaction Rate' }
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{stat.number}</div>
                            <div className="text-slate-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-20 text-center"
            >
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Built by a Passionate Team</h2>
                <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    We're a dedicated team of developers, designers, and customer success specialists working around the clock to make Fixora the best service marketplace in Bangladesh.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutPage;
