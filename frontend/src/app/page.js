"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight, Star, Users, Shield, Zap,
    Search, MapPin, Camera
} from 'lucide-react';
import { toast } from 'sonner';

const LandingPage = () => {
    return (
        <div className="flex flex-col">
            {/* 1. Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="px-4 py-2 rounded-full glass text-blue-400 text-sm font-medium mb-6 inline-block">
                            #1 Marketplace for Local Pros
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
                            Find the Perfect <br />
                            <span className="gradient-text">Local Service</span> Ready to Help
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Fixora connects you with verified experts for everything from emergency plumbing to professional home cleaning. Quality guaranteed.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/services" className="px-8 py-4 gradient-bg rounded-xl font-bold text-white hover-glow flex items-center gap-2 transition-all w-full sm:w-auto">
                                Browse Services <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/add-service" className="px-8 py-4 glass rounded-xl font-bold text-white hover:bg-white/10 transition-all w-full sm:w-auto">
                                List Your Service
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Services Overview */}
            <section className="py-24 bg-[#0b0f1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Service Categories</h2>
                        <p className="text-slate-300">Whatever you need, we have an expert for it.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Electrical', icon: Zap, count: '120+ Pros', color: 'text-yellow-400' },
                            { name: 'Plumbing', icon: MapPin, count: '85+ Pros', color: 'text-blue-400' },
                            { name: 'Cleaning', icon: Search, count: '200+ Pros', color: 'text-emerald-400' },
                            { name: 'Painting', icon: Camera, count: '45+ Pros', color: 'text-purple-400' },
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-slate-300">Simple 3-step process to get things fixed</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
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
                </div>
            </section>

            {/* 7. Contact / Newsletter */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="gradient-bg rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">Subscribe to Our Newsletter</h2>
                            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                                Get weekly tips on home maintenance and exclusive discounts on top-rated services.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                    onClick={() => toast.success("Subscribed successfully! Welcome to our newsletter.")}
                                    className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
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
