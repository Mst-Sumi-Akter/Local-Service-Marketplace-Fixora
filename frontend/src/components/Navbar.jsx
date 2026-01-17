"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Hammer, LogIn, PlusCircle } from 'lucide-react';
import { parseCookies, destroyCookie } from 'nookies';

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const cookies = parseCookies();
        setIsLoggedIn(!!cookies.auth_token);
        setRole(cookies.user_role || 'user');
    }, [pathname]);

    const handleLogout = () => {
        destroyCookie(null, 'auth_token');
        destroyCookie(null, 'user_role');
        destroyCookie(null, 'user_name');
        setIsLoggedIn(false);
        setRole(null);
        window.location.href = '/';
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },

        { name: 'Impact', href: '/impact' },
        { name: 'About', href: '/about' },
        { name: 'Pro Membership', href: '/pro-membership' },
        { name: 'Contact', href: '/contact' },
        ...(isLoggedIn ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
        ...(isLoggedIn && (role === 'provider' || role === 'admin') ? [{ name: 'Add Service', href: '/add-service' }] : [])
    ];

    return (
        <nav className="fixed w-full z-50 glass border-b border-white/10 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 gradient-bg rounded-lg group-hover:rotate-12 transition-transform">
                                <Hammer className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Fixora</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-blue-400 ${pathname === link.href ? 'text-blue-400' : 'text-slate-300'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white gradient-bg rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2 text-sm font-medium text-white gradient-bg rounded-full hover-glow transition-all flex items-center gap-2"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-white/10 animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="w-full mt-2 px-3 py-2 text-base font-medium text-white gradient-bg rounded-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2 mt-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md text-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full px-3 py-2 text-base font-medium text-white gradient-bg rounded-md text-center"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
