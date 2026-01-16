import React, { useState, useEffect } from 'react';
import {
    ShoppingBag, Heart, Star, Clock, Calendar,
    User, Settings, LogOut, ChevronRight, MapPin, Bell
} from 'lucide-react';
import { destroyCookie } from 'nookies';
import { toast } from 'sonner';

const UserDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:5000/user/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch user stats", error);
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

    const upcomingBooking = stats?.bookingHistory?.find(b => b.status === 'Pending');

    return (
        <div className="flex h-screen bg-[#0f172a] -mt-24 pt-24 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col bg-[#0f172a]/50 glass">
                <div className="p-6">
                    <h2 className="text-xl font-bold gradient-text">My Account</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { icon: User, label: 'Profile', active: true },
                        { icon: ShoppingBag, label: 'My Bookings', active: false },
                        { icon: Heart, label: 'Saved Services', active: false },
                        { icon: Star, label: 'My Reviews', active: false },
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
                        <h1 className="text-2xl font-bold text-white">Hello, User!</h1>
                        <p className="text-sm text-slate-400">Here is what's happening with your account.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 relative bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10">
                            <Bell className="w-5 h-5 text-slate-300" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full"></span>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white border-2 border-white/20">
                            U
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Active Booking Hero */}
                    {upcomingBooking && (
                        <div className="glass p-8 rounded-[32px] border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <Clock className="w-5 h-5 text-blue-400" /> Upcoming Appointment
                            </h2>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center">
                                        <ShoppingBag className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{upcomingBooking.service}</h3>
                                        <p className="text-slate-400 text-sm mb-3">Provider: {upcomingBooking.provider}</p>
                                        <div className="flex items-center gap-4 text-sm font-medium">
                                            <span className="flex items-center gap-1 text-slate-300 bg-white/5 px-3 py-1 rounded-full"><Calendar className="w-4 h-4 text-blue-400" /> {upcomingBooking.date}</span>
                                            <span className="flex items-center gap-1 text-slate-300 bg-white/5 px-3 py-1 rounded-full"><MapPin className="w-4 h-4 text-blue-400" /> 123 Main St, Dhaka</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full md:w-auto">
                                    <button className="px-6 py-3 gradient-bg rounded-xl font-bold hover-glow transition-all">View Details</button>
                                    <button className="px-6 py-3 glass hover:bg-white/10 rounded-xl font-bold transition-all">Reschedule</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <h3 className="text-xl font-bold">Booking History</h3>
                    <div className="glass rounded-[32px] border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="px-8 py-5">Service</th>
                                        <th className="px-8 py-5">Provider</th>
                                        <th className="px-8 py-5">Date</th>
                                        <th className="px-8 py-5">Price</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5">Review</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {stats?.bookingHistory?.map((item, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-5 font-bold text-white">{item.service}</td>
                                            <td className="px-8 py-5 text-sm text-slate-400">{item.provider}</td>
                                            <td className="px-8 py-5 text-sm text-slate-400">{item.date}</td>
                                            <td className="px-8 py-5 font-bold text-white">৳{item.amount}</td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                                    item.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                                        'bg-red-500/10 border-red-500/20 text-red-400'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                {item.status === 'Completed' ? (
                                                    <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                                                ) : (
                                                    <span className="text-xs text-slate-500">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {(!stats?.bookingHistory || stats.bookingHistory.length === 0) && (
                                <div className="p-8 text-center text-slate-400">No booking history found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
