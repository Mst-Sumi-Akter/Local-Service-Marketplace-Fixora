import React, { useState, useEffect } from 'react';
import {
    TrendingUp, Users, DollarSign, Briefcase, Plus, Calendar,
    LayoutDashboard, Package, MessageSquare, Settings, Bell, Search,
    ChevronRight, LogOut, Star
} from 'lucide-react';
import Link from 'next/link';
import { destroyCookie } from 'nookies';
import { toast } from 'sonner';

const ProviderDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:5000/provider/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleLogout = () => {
        destroyCookie(null, 'auth_token');
        destroyCookie(null, 'user_role');
        destroyCookie(null, 'user_name');
        window.location.href = '/';
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0f172a]">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#0f172a] -mt-24 pt-24 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col bg-[#0f172a]/50 glass">
                <div className="p-6">
                    <h2 className="text-xl font-bold gradient-text">Provider Panel</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { icon: LayoutDashboard, label: 'Overview', active: true },
                        { icon: Package, label: 'My Services', active: false },
                        { icon: Briefcase, label: 'Orders', active: false },
                        { icon: MessageSquare, label: 'Messages', badge: '3' },
                        { icon: DollarSign, label: 'Wallet', active: false },
                        { icon: Settings, label: 'Settings', active: false },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Topbar */}
                <header className="sticky top-0 z-20 glass border-b border-white/10 p-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                        <p className="text-sm text-slate-400">Welcome back, Sparky Solutions!</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2">
                            <Search className="w-4 h-4 text-slate-400 mr-2" />
                            <input type="text" placeholder="Search orders..." className="bg-transparent border-none focus:outline-none text-sm text-white w-48" />
                        </div>
                        <button className="p-2 relative bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10">
                            <Bell className="w-5 h-5 text-slate-300" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full"></span>
                        </button>
                        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white border-2 border-white/20">
                            S
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Revenue', value: `৳${stats?.earnings || 0}`, change: '+12.5%', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                            { label: 'Active Jobs', value: stats?.activeJobs || 0, change: '+3', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { label: 'Total Clients', value: stats?.totalClients || 0, change: '+24%', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                            { label: 'Avg Rating', value: '4.9', change: '+0.2', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                        ].map((stat, i) => (
                            <div key={i} className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group hover:bg-white/5 transition-all">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl -mr-4 -mt-4 group-hover:scale-110 transition-transform"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                                        <TrendingUp className="w-3 h-3" /> {stat.change}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                                <p className="text-slate-400 font-medium text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Revenue Chart Placeholder */}
                        <div className="lg:col-span-2 glass p-8 rounded-[32px] border-white/10">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold">Revenue Analytics</h3>
                                <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-300 outline-none">
                                    <option>This Week</option>
                                    <option>This Month</option>
                                    <option>This Year</option>
                                </select>
                            </div>
                            <div className="h-64 flex items-end justify-between gap-2 px-4">
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                    <div key={i} className="w-full bg-blue-500/10 rounded-t-lg relative group">
                                        <div
                                            style={{ height: `${h}%` }}
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg group-hover:from-blue-500 group-hover:to-blue-300 transition-all opacity-80 group-hover:opacity-100"
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-4 px-2">
                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                            </div>
                        </div>

                        {/* Recent Activity / Action Box */}
                        <div className="glass p-8 rounded-[32px] border-white/10 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-0"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2">Grow Business</h3>
                                <p className="text-slate-300 text-sm mb-6">List a new service to reach more customers and increase earnings.</p>
                                <Link href="/add-service" className="w-full py-4 gradient-bg rounded-xl font-bold flex items-center justify-center gap-2 hover-glow transition-all mb-4">
                                    <Plus className="w-5 h-5" /> Add New Service
                                </Link>
                                <button className="w-full py-4 glass bg-white/5 hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                    View Analytics
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="glass rounded-[32px] border-white/10 overflow-hidden">
                        <div className="p-8 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Recent Orders</h3>
                            <button className="text-blue-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="px-8 py-5">Order ID</th>
                                        <th className="px-8 py-5">Customer</th>
                                        <th className="px-8 py-5">Service</th>
                                        <th className="px-8 py-5">Date</th>
                                        <th className="px-8 py-5">Amount</th>
                                        <th className="px-8 py-5">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {stats?.recentOrders?.map((order, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-5 text-sm font-medium text-slate-300">#{order.id}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                                                        {order.customer.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-medium">{order.customer}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-slate-400">{order.service}</td>
                                            <td className="px-8 py-5 text-sm text-slate-400">{order.date}</td>
                                            <td className="px-8 py-5 font-bold text-white">৳{order.amount}</td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                                    order.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                                        'bg-red-500/10 border-red-500/20 text-red-400'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                                <div className="p-8 text-center text-slate-400">No recent orders found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProviderDashboard;
