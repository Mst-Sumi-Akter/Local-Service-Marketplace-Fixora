import React from 'react';
import Link from 'next/link';
import { Hammer, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0b0f1a] border-t border-white/5 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="p-2 gradient-bg rounded-lg">
                                <Hammer className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Fixora</span>
                        </Link>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Connecting skilled local professionals with customers who need work done. Quality services, transparent pricing, and reliable experts.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="p-2 bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 rounded-full transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Home</Link></li>
                            <li><Link href="/services" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Browse Services</Link></li>
                            <li><Link href="/impact" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Impact</Link></li>
                            <li><Link href="/add-service" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Register as Provider</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Success Stories</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Safety Information</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <Mail className="w-4 h-4 text-blue-400" />
                                hello@fixora.com
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <Phone className="w-4 h-4 text-blue-400" />
                                +1 (555) 000-FIX-IT
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                123 Maker Street, Tech City
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center">
                    <p className="text-slate-400 text-xs">
                        © {new Date().getFullYear()} Fixora Marketplace. All rights reserved. Made with love for Local Providers.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
