"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Star, Clock, ShieldCheck, MapPin, User, ArrowLeft,
    MessageSquare, Calendar, Share2, Heart, CreditCard, Wallet, Banknote, X
} from 'lucide-react';
import { toast } from 'sonner';

const ServiceDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('default'); // 'default', 'booking', 'chat'
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [chatMessage, setChatMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! How can I help you today?", sender: 'pro' }
    ]);

    const handleBooking = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: 'Processing payment...',
            success: () => {
                setViewMode('default');
                return 'Booking confirmed successfully!';
            },
            error: 'Payment failed'
        });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const newMessage = { id: Date.now(), text: chatMessage, sender: 'user' };
        setMessages([...messages, newMessage]);
        setChatMessage('');

        // Simulate Pro Response
        setTimeout(() => {
            const response = { id: Date.now() + 1, text: "Thanks for your message! I'll get back to you shortly.", sender: 'pro' };
            setMessages(prev => [...prev, response]);
        }, 1500);
    };

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(`http://localhost:5000/services/${id}`);
                if (!res.ok) throw new Error("Service not found");
                const data = await res.json();
                setService(data);
            } catch (error) {
                console.error("Error fetching service:", error);
                router.push('/services');
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-400">Loading service details...</p>
        </div>
    );

    if (!service) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
            </button>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column: Image and Main Info */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl">
                        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                        <div className="absolute top-6 left-6 flex gap-3">
                            <span className="px-4 py-2 glass rounded-full text-xs font-bold flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified
                            </span>
                            <span className="px-4 py-2 glass rounded-full text-xs font-bold flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {service.rating} Rating
                            </span>
                        </div>
                    </div>

                    <div className="glass p-10 rounded-[40px] border-white/5">
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-4xl md:text-5xl font-black">{service.name}</h1>
                            <div className="flex gap-2">
                                <button className="p-3 glass rounded-xl hover:bg-white/10 transition-all"><Share2 className="w-5 h-5" /></button>
                                <button className="p-3 glass rounded-xl hover:bg-white/10 transition-all"><Heart className="w-5 h-5" /></button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-10 text-slate-400">
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> Dhaka, Bangladesh</div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" /> Response: 1hr</div>
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> Member since 2023</div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">About this service</h2>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                {service.description}
                                <br /><br />
                                Our professional team brings years of experience and expertise to every job. We use only the highest quality materials and follow industry best practices to ensure your complete satisfaction.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                {[
                                    '24/7 Professional Support',
                                    'Fixed & Transparent Pricing',
                                    'Highly Skilled & Certified',
                                    'Guaranteed Results'
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Interaction Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl relative overflow-hidden transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            {viewMode === 'default' && (
                                <div className="animate-fade-in space-y-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-400 font-medium">Starting from</span>
                                        <span className="text-4xl font-black text-blue-400">৳{service.price}</span>
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            onClick={() => setViewMode('booking')}
                                            className="w-full py-5 gradient-bg rounded-2xl text-white font-bold text-lg hover-glow transition-all active:scale-[0.98]"
                                        >
                                            Book Appointment
                                        </button>
                                        <button
                                            onClick={() => setViewMode('chat')}
                                            className="w-full py-5 glass border-white/10 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <MessageSquare className="w-5 h-5" /> Chat with Pro
                                            </div>
                                        </button>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 text-center">
                                        <p className="text-slate-500 text-sm">Secure payment via Fixora Escrow</p>
                                    </div>
                                </div>
                            )}

                            {viewMode === 'booking' && (
                                <div className="animate-fade-in">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold">Complete Booking</h3>
                                        <button onClick={() => setViewMode('default')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                            <X className="w-5 h-5 text-slate-400" />
                                        </button>
                                    </div>

                                    {/* Date & Time */}
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                                <input type="date" className="w-full pl-12 pr-4 py-3 glass rounded-xl border-white/5 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Time</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                                <input type="time" className="w-full pl-12 pr-4 py-3 glass rounded-xl border-white/5 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="mb-8">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Payment Method</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { id: 'card', icon: CreditCard, label: 'Card' },
                                                { id: 'mobile', icon: Wallet, label: 'Bkash' },
                                                { id: 'cash', icon: Banknote, label: 'Cash' }
                                            ].map((method) => (
                                                <button
                                                    key={method.id}
                                                    onClick={() => setPaymentMethod(method.id)}
                                                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === method.id
                                                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                                        : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <method.icon className="w-5 h-5" />
                                                    <span className="text-xs font-bold">{method.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Total & Pay */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm py-3 border-t border-white/10">
                                            <span className="text-slate-400">Total to pay</span>
                                            <span className="text-xl font-black text-white">৳{service.price}</span>
                                        </div>
                                        <button
                                            onClick={handleBooking}
                                            className="w-full py-4 gradient-bg rounded-xl text-white font-bold hover-glow transition-all"
                                        >
                                            Confirm & Pay
                                        </button>
                                    </div>
                                </div>
                            )}

                            {viewMode === 'chat' && (
                                <div className="animate-fade-in flex flex-col h-[500px] -m-8">
                                    {/* Chat Header */}
                                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-bold text-sm">
                                                {service.provider ? service.provider.charAt(0) : 'P'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm">{service.provider || 'Premium Provider'}</h3>
                                                <div className="flex items-center gap-1 text-xs text-emerald-400">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => setViewMode('default')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                            <X className="w-5 h-5 text-slate-400" />
                                        </button>
                                    </div>

                                    {/* Messages Area */}
                                    <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div
                                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                                        : 'bg-white/10 text-slate-200 rounded-tl-none'
                                                        }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 border-t border-white/10 bg-white/5">
                                        <form onSubmit={handleSendMessage} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={chatMessage}
                                                onChange={(e) => setChatMessage(e.target.value)}
                                                placeholder="Type your message..."
                                                className="flex-1 px-4 py-2 glass rounded-xl border-white/5 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                                            />
                                            <button
                                                type="submit"
                                                className="p-3 gradient-bg rounded-xl text-white hover-glow transition-all disabled:opacity-50"
                                                disabled={!chatMessage.trim()}
                                            >
                                                <MessageSquare className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="glass p-8 rounded-[40px] border-white/5">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-400" /> Provider Info
                            </h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-xl font-bold">
                                    {service.provider ? service.provider.charAt(0) : 'P'}
                                </div>
                                <div>
                                    <h4 className="font-bold">{service.provider || 'Premium Provider'}</h4>
                                    <p className="text-slate-500 text-xs">Top Rated Service Provider</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Completed Jobs</span>
                                    <span className="font-bold">150+</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Repeat Clients</span>
                                    <span className="font-bold">85%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;
