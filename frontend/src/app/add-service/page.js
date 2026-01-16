"use client";
import React, { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import {
    PlusCircle, Image as ImageIcon, Briefcase, FileText,
    DollarSign, CheckCircle2, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const AddServicePage = () => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const cookies = parseCookies();
        const role = cookies.user_role;

        if (!cookies.auth_token) {
            router.push('/login');
            return;
        }

        if (role !== 'provider' && role !== 'admin') {
            toast.error("Access Denied: Only Service Providers can add services.");
            router.push('/');
            return;
        }

        setIsAuthorized(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSuccess(true);
                toast.success('Service created successfully! Redirecting...');
                setTimeout(() => {
                    router.push('/services');
                }, 2000);
            } else {
                const data = await res.json();
                setError(data.message || 'Something went wrong');
                toast.error(data.message || 'Failed to create service.');
            }
        } catch (error) {
            setError('Failed to connect to backend server.');
            toast.error('Failed to connect to backend server.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthorized) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="glass p-8 md:p-12 rounded-[40px] border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>

                <div className="relative mb-12">
                    <h1 className="text-4xl font-black mb-4">Add New <span className="gradient-text">Service</span></h1>
                    <p className="text-slate-300">Expand your business by listing a new service on Fixora.</p>
                </div>

                {success && (
                    <div className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center gap-4 text-emerald-400 animate-fade-in">
                        <CheckCircle2 className="w-8 h-8" />
                        <div>
                            <p className="font-bold text-lg">Service Created Successfully!</p>
                            <p className="text-sm opacity-80">Redirecting to services list...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-500 animate-shake">
                        <AlertCircle className="w-8 h-8" />
                        <div>
                            <p className="font-bold text-lg">Failed to Create Service</p>
                            <p className="text-sm opacity-80">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 relative">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 ml-1 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-blue-400" /> Service Name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Professional AC Repair"
                                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder:text-slate-500 text-white"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 ml-1 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-blue-400" /> Price / Rate (৳)
                            </label>
                            <input
                                type="number"
                                required
                                placeholder="e.g. 1500"
                                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder:text-slate-500 text-white"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 ml-1 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-blue-400" /> Image URL
                        </label>
                        <input
                            type="url"
                            required
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder:text-slate-500 text-white"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                        <p className="text-[10px] text-slate-400 ml-1 uppercase tracking-widest font-bold">Use high resolution images from Unsplash or similar</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 ml-1 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-400" /> Comprehensive Description
                        </label>
                        <textarea
                            rows="5"
                            required
                            placeholder="Describe your service in detail..."
                            className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none placeholder:text-slate-500 text-white"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={loading || success}
                            className="w-full py-5 gradient-bg rounded-2xl text-white font-bold text-lg hover-glow transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <PlusCircle className="w-6 h-6" />
                            )}
                            {loading ? 'Publishing...' : 'Publish Service Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServicePage;
