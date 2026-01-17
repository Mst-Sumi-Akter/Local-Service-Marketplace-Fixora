"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import {
    ArrowRight, Star, Users, Shield, Zap,
    Search, MapPin, Camera, Droplets, Paintbrush, Sparkles
} from 'lucide-react';

import { toast } from 'sonner';

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2000&auto=format&fit=crop",
            title: "Expert Plumbing",
            desc: "24/7 emergency support for leaks, clogs, and full installations."
        },
        {
            image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2000&auto=format&fit=crop",
            title: "Expert Electricians",
            desc: "Professional wiring and electrical repairs for your home."
        },
        {
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2000&auto=format&fit=crop",
            title: "Professional Painting",
            desc: "Transform your space with our expert color consultants and painters."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col">
            {/* 1. Hero Section - Reverted to Center Aligned Slider */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 bg-slate-950">
                {/* Image Slider Background */}
                <div className="absolute inset-0 z-0 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950 z-10"></div>
                            <img
                                src={slides[currentSlide].image}
                                alt="Service background"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
                    <motion.div
                        key={currentSlide + '-content'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="px-4 py-2 rounded-full glass text-blue-400 text-sm font-medium mb-6 inline-block">
                            #{currentSlide + 1} Local Experts in {slides[currentSlide].title}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-white">
                            Find the Perfect <br />
                            <span className="gradient-text">Local Service</span> Ready to Help
                        </h1>
                        <p className="text-xl text-slate-200 shadow-sm max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            {slides[currentSlide].desc} Fixora connects you with verified experts for everything you need.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/services" className="px-8 py-4 gradient-bg rounded-xl font-bold text-white hover-glow flex items-center gap-2 transition-all w-full sm:w-auto shadow-xl">
                                Browse Services <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/add-service" className="px-8 py-4 glass rounded-xl font-bold text-white hover:bg-white/10 transition-all w-full sm:w-auto backdrop-blur-md">
                                List Your Service
                            </Link>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex justify-center gap-2 mt-12">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-12 h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'bg-blue-500 w-16' : 'bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* 2. Services Overview */}
            <section className="py-24 bg-[#0b0f1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-white">Popular Service</span>{' '}
                            <span className="gradient-text">Categories</span>
                        </h2>
                        <p className="text-slate-300">Whatever you need, we have an expert for it.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Electrical', icon: Zap, count: '120+ Pros', color: 'text-yellow-400' },
                            { name: 'Plumbing', icon: Droplets, count: '85+ Pros', color: 'text-blue-400' },
                            { name: 'Cleaning', icon: Sparkles, count: '200+ Pros', color: 'text-emerald-400' },
                            { name: 'Painting', icon: Paintbrush, count: '45+ Pros', color: 'text-purple-400' },

                        ].map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="glass p-8 rounded-2xl text-center border-white/5 hover:border-blue-500/50 transition-colors cursor-pointer"
                            >
                                <cat.icon className={`w-12 h-12 mx-auto mb-6 ${cat.color}`} />
                                <h3 className="text-lg font-bold mb-2">{cat.name}</h3>
                                <p className="text-slate-400 text-sm">{cat.count}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. How It Works */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-white">How It</span>{' '}
                            <span className="gradient-text">Works</span>
                        </h2>
                        <Link href="/how-it-works" className="text-blue-400 hover:text-blue-300 text-sm font-medium">Learn More About Our Process</Link>

                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 -z-10"></div>

                        {[
                            { step: '01', title: 'Search Service', desc: 'Browse through our extensive list of local categories and find what you need.' },
                            { step: '02', title: 'Choose Provider', desc: 'Check reviews, compare prices, and pick the professional that fits your needs.' },
                            { step: '03', title: 'Get It Done', desc: 'Book the service and wait for the pro to arrive. Pay once the work is complete.' },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-2xl font-black mx-auto mb-8 group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                            Browse Services Now <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* 4. Top Rated Providers */}
            <section className="py-24 bg-[#0b0f1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Experts</h2>
                            <p className="text-slate-300">Hand-picked professionals with perfect track records.</p>
                        </div>
                        <Link href="/services" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 font-medium">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'John Doe', role: 'Master Electrician', rating: 5.0, image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1500&auto=format&fit=crop' },
                            { name: 'Sarah Smith', role: 'Interior Designer', rating: 4.9, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1500&auto=format&fit=crop' },
                            { name: 'Mike Johnson', role: 'Certified Plumber', rating: 4.8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1500&auto=format&fit=crop' },
                        ].map((pro, idx) => (
                            <motion.div key={idx} className="glass rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all">
                                <div className="h-64 overflow-hidden">
                                    <img src={pro.image} alt={pro.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">{pro.name}</h3>
                                            <p className="text-slate-300 text-sm">{pro.role}</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded text-yellow-500 text-sm font-bold">
                                            <Star className="w-4 h-4 fill-yellow-500" /> {pro.rating}
                                        </div>
                                    </div>
                                    <button className="w-full py-3 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                                        View Portfolio
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Why Choose Fixora */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                                Why People Trust <br />
                                <span className="gradient-text">Our Marketplace</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { icon: Shield, title: 'Verified Background', desc: 'All our professionals go through a multi-step verification process.' },
                                    { icon: Users, title: 'Expert Team', desc: 'Over 10,000+ skilled experts across 50+ categories.' },
                                    { icon: Star, title: 'Satisfaction Guaranteed', desc: 'If you are not happy with the service, we will make it right.' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                            <item.icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                            <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=1470&auto=format&fit=crop" alt="Pro at work" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 glass p-8 rounded-2xl border-white/10 hidden sm:block">
                                <div className="text-4xl font-bold mb-2">99%</div>
                                <div className="text-slate-300 text-sm">Customer <br /> Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Testimonials */}
            <section className="py-24 bg-[#0b0f1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-white">What Our</span>{' '}
                            <span className="gradient-text">Users Say</span>
                        </h2>
                        <p className="text-slate-300">Join thousands of happy customers today.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Emily Clarck', text: 'I found an electrician within 10 minutes for an emergency. The service was top notch!', role: 'Home Owner' },
                            { name: 'Robert Fox', text: 'The easiest way to find reliable cleaners. I have been using Fixora for months now.', role: 'Office Manager' },
                            { name: 'Jessica Doe', text: 'Transparent pricing and great professionals. Highly recommended for any home repairs.', role: 'Apartment Tenant' },
                        ].map((test, idx) => (
                            <div key={idx} className="glass p-10 rounded-3xl border-white/5 relative">
                                <Star className="w-8 h-8 text-blue-500/20 absolute top-8 right-8" />
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                                </div>
                                <p className="text-lg text-slate-300 italic mb-8 leading-relaxed">"{test.text}"</p>
                                <div>
                                    <h4 className="font-bold">{test.name}</h4>
                                    <p className="text-slate-400 text-sm">{test.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">
                            Find Your Expert <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* 7. Contact / Newsletter */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900/80 glass rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-6">
                                <span className="text-white">Subscribe to</span>{' '}
                                <span className="gradient-text">Our Newsletter</span>
                            </h2>
                            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                                Get weekly tips on home maintenance and exclusive discounts on top-rated services.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                                />
                                <button
                                    onClick={() => toast.success("Subscribed successfully! Welcome to our newsletter.")}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                            <p className="mt-6 text-white/60 text-sm">We respect your privacy. Unsubscribe at any time.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
