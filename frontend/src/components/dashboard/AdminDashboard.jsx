import React, { useState, useEffect } from 'react';
import {
    Users, Shield, Server, Activity, AlertTriangle, CheckCircle,
    LayoutGrid, Settings, FileText, BarChart2, Bell, Search, LogOut, ChevronDown
} from 'lucide-react';
import { destroyCookie } from 'nookies';
import { toast } from 'sonner';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:5000/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
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
                <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#0f172a] -mt-24 pt-24 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col bg-[#0f172a]/50 glass">
                <div className="p-6">
                    <h2 className="text-xl font-bold gradient-text">Admin Console</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { icon: LayoutGrid, label: 'Dashboard', active: true },
                        { icon: Users, label: 'User Management', active: false },
                        { icon: Shield, label: 'Verifications', badge: '12' },
                        { icon: FileText, label: 'Reports', active: false },
                        { icon: BarChart2, label: 'Analytics', active: false },
                        { icon: Settings, label: 'System Settings', active: false },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${item.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
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
                        <h1 className="text-2xl font-bold text-white">System Overview</h1>
                        <p className="text-sm text-slate-400">Monitoring system status and performance.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2">
                            <Search className="w-4 h-4 text-slate-400 mr-2" />
                            <input type="text" placeholder="Search system logs..." className="bg-transparent border-none focus:outline-none text-sm text-white w-48" />
                        </div>
                        <button className="p-2 relative bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10">
                            <Bell className="w-5 h-5 text-slate-300" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full"></span>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white border-2 border-white/20">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* System Health Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Total Users', value: stats?.totalUsers || 0, status: '+2 today', icon: Users, color: 'text-blue-400', bg: 'bg-blue-900/20' },
                            { label: 'Total Services', value: stats?.totalServices || 0, status: '98.5% uptime', icon: Server, color: 'text-purple-400', bg: 'bg-purple-900/20' },
                            { label: 'Total Revenue', value: `৳${stats?.revenue || 0}`, status: 'All systems operational', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-900/20' },
                        ].map((stat, i) => (
                            <div key={i} className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group hover:bg-white/5 transition-all">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-[100px] -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                                        <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                                        <h3 className="text-3xl font-black">{stat.value}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 p-2 rounded-lg w-fit">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    {stat.status}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* New Users Table */}
                        <div className="lg:col-span-2 glass rounded-[32px] border-white/10 overflow-hidden">
                            <div className="p-8 border-b border-white/10 flex justify-between items-center">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Users className="w-5 h-5 text-indigo-400" /> Recent User Registrations
                                </h3>
                                <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300">View All Users</button>
                            </div>
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {stats?.recentUsers?.map((user, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-xs font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                                                    user.role === 'provider' ? 'bg-amber-500/20 text-amber-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{user.joined}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Action Cards */}
                        <div className="space-y-6">
                            <div className="glass p-6 rounded-[32px] border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                                <h3 className="font-bold mb-4">Pending Approvals</h3>
                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm">New Service: HVAC</h4>
                                            <p className="text-xs text-slate-400">by Cool Pros</p>
                                        </div>
                                        <button className="text-xs bg-indigo-600 px-3 py-2 rounded-lg font-bold">Review</button>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm">ID Verification</h4>
                                            <p className="text-xs text-slate-400">User: John Doe</p>
                                        </div>
                                        <button className="text-xs bg-indigo-600 px-3 py-2 rounded-lg font-bold">Review</button>
                                    </div>
                                </div>
                            </div>

                            <div className="glass p-6 rounded-[32px] border-white/10">
                                <h3 className="font-bold mb-4">Server Resources</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 text-slate-400">
                                            <span>CPU Usage</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full w-[45%]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 text-slate-400">
                                            <span>Memory</span>
                                            <span>62%</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                            <div className="bg-purple-500 h-full w-[62%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
