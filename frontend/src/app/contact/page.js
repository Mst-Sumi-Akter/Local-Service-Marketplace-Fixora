"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Loading from '@/components/Loading';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSubmitted(true);
            toast.success('Message sent successfully! We will get back to you shortly.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-5xl md:text-6xl font-black mb-6">
                    Get in <span className="gradient-text">Touch</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {/* Contact Info Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass p-8 rounded-3xl border-white/5 text-center hover:border-blue-500/30 transition-all"
                >
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-slate-400 text-sm mb-4">We're here to help</p>
                    <a href="mailto:support@fixora.com" className="text-blue-400 hover:text-blue-300 font-medium">
                        support@fixora.com
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass p-8 rounded-3xl border-white/5 text-center hover:border-purple-500/30 transition-all"
                >
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
                        <Phone className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                    <p className="text-slate-400 text-sm mb-4">Mon-Fri 9am-6pm</p>
                    <a href="tel:+8801234567890" className="text-purple-400 hover:text-purple-300 font-medium">
                        +880 1234-567890
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass p-8 rounded-3xl border-white/5 text-center hover:border-emerald-500/30 transition-all"
                >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                        <MapPin className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                    <p className="text-slate-400 text-sm mb-4">Come say hello</p>
                    <p className="text-emerald-400 font-medium">
                        Dhaka, Bangladesh
                    </p>
                </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-[40px] border-white/5 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Send us a Message</h2>
                            <p className="text-slate-400 text-sm">We'll get back to you within 24 hours</p>
                        </div>
                    </div>

                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4 text-emerald-400"
                        >
                            <CheckCircle className="w-6 h-6 shrink-0" />
                            <div>
                                <p className="font-bold">Message Sent Successfully!</p>
                                <p className="text-sm opacity-80">We'll respond to you soon.</p>
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-bold text-slate-300 mb-2 block">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-300 mb-2 block">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-slate-300 mb-2 block">Subject</label>
                            <input
                                type="text"
                                required
                                placeholder="How can we help you?"
                                className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-slate-300 mb-2 block">Message</label>
                            <textarea
                                rows="6"
                                required
                                placeholder="Tell us more about your inquiry..."
                                className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-4 gradient-bg rounded-xl font-bold text-white hover-glow transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {sending ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center gap-2 text-slate-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Average response time: 2-4 hours</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;
