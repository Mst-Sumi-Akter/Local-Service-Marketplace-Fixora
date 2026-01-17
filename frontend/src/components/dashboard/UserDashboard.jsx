import React, { useState, useEffect } from 'react';
import {
    ShoppingBag, Heart, Star, Clock, Calendar,
    User, Settings, LogOut, ChevronRight, MapPin, Bell
} from 'lucide-react';
import { destroyCookie, parseCookies } from 'nookies';

import { toast } from 'sonner';
import { API_URL } from '@/lib/api';


const UserDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('User');
    const [activeTab, setActiveTab] = useState('My Bookings');


    useEffect(() => {
        const cookies = parseCookies();
        const currentName = cookies.user_name || 'User';
        setUserName(currentName);

        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/user/stats?name=${encodeURIComponent(currentName)}`);

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

        // Prevent double scrollbar
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
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
        <div className="fixed inset-0 z-0 flex bg-[#0f172a] pt-16 overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col bg-[#0f172a]/50 glass">
                <div className="p-6">
                    <h2 className="text-xl font-bold gradient-text">My Account</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { icon: User, label: 'Profile' },
                        { icon: ShoppingBag, label: 'My Bookings' },
                        { icon: Heart, label: 'Saved Services' },
                        { icon: Star, label: 'My Reviews' },
                        { icon: Settings, label: 'Settings' },
                    ].map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item.label)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === item.label ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'
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
                        <h1 className="text-2xl font-bold text-white">Hello, {userName}!</h1>
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
                    {activeTab === 'My Bookings' && (
                        <>
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
                        </>
                    )}

                    {activeTab === 'Profile' && (
                        <div className="glass p-12 rounded-[40px] border-white/10 relative overflow-hidden max-w-3xl mx-auto">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                            <div className="relative flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-3xl gradient-bg p-1 mb-8 shadow-2xl">
                                    <div className="w-full h-full rounded-[20px] bg-slate-900 flex items-center justify-center text-4xl font-black">
                                        {userName.charAt(0)}
                                    </div>
                                </div>
                                <h2 className="text-3xl font-black mb-2">{userName}</h2>
                                <p className="text-slate-400 mb-8 font-medium">Fixora Member since Jan 2024</p>

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="glass p-6 rounded-2xl border-white/5">
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Spent</p>
                                        <p className="text-2xl font-black">৳{stats?.bookingHistory?.reduce((acc, b) => acc + (b.amount || 0), 0) || 0}</p>
                                    </div>
                                    <div className="glass p-6 rounded-2xl border-white/5">
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Trust Score</p>
                                        <p className="text-2xl font-black text-emerald-400">98%</p>
                                    </div>
                                </div>

                                <button className="mt-10 px-8 py-4 gradient-bg rounded-xl font-bold hover-glow transition-all">Edit Account Details</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Saved Services' && (
                        <div className="text-center py-24 glass rounded-[32px] border-dashed border-white/20">
                            <Heart className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-2 text-slate-300">No Saved Services</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">You haven't saved any services yet. Browse our marketplace to find experts you love!</p>
                            <button onClick={() => window.location.href = '/services'} className="mt-8 px-6 py-3 glass hover:bg-white/10 rounded-xl font-bold transition-all">Explore Services</button>
                        </div>
                    )}

                    {activeTab === 'My Reviews' && (
                        <div className="text-center py-24 glass rounded-[32px] border-dashed border-white/20">
                            <Star className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-2 text-slate-300">No Reviews Yet</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">Once you complete a service, you'll be able to leave a review and share your experience.</p>
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <div className="glass p-10 rounded-[32px] border-white/10 space-y-8 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 glass rounded-2xl border-white/5">
                                    <div>
                                        <p className="font-bold">Email Notifications</p>
                                        <p className="text-xs text-slate-500">Get updates about your bookings</p>
                                    </div>
                                    <div className="w-12 h-6 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                                </div>
                                <div className="flex items-center justify-between p-4 glass rounded-2xl border-white/5">
                                    <div>
                                        <p className="font-bold">Two-Factor Authentication</p>
                                        <p className="text-xs text-slate-500">Keep your account secure</p>
                                    </div>
                                    <div className="w-12 h-6 bg-slate-700 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                                </div>
                            </div>
                            <button className="w-full py-4 glass border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-all">Delete Account</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
