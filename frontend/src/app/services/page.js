"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Star, ArrowRight, Filter, MapPin, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_URL } from '@/lib/api';


const ServicesPage = () => {
    const [mounted, setMounted] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('default');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        setMounted(true);
        const fetchServices = async () => {
            try {
                const res = await fetch(`${API_URL}/services`);

                const data = await res.json();
                setServices(data);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, priceRange, minRating, sortBy]);

    const filteredServices = services
        .filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = s.price >= priceRange[0] && s.price <= priceRange[1];
            const matchesRating = (s.rating || 5.0) >= minRating;
            return matchesSearch && matchesPrice && matchesRating;
        })
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return (b.rating || 5.0) - (a.rating || 5.0);
            return 0;
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

    const clearFilters = () => {
        setPriceRange([0, 5000]);
        setMinRating(0);
        setSortBy('default');
    };

    const activeFiltersCount = (priceRange[0] !== 0 || priceRange[1] !== 5000 ? 1 : 0) +
        (minRating > 0 ? 1 : 0) +
        (sortBy !== 'default' ? 1 : 0);

    if (!mounted) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold mb-6">Browse <span className="gradient-text">Services</span></h1>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="What do you need help with?"
                            className="w-full pl-12 pr-4 py-4 glass border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500 text-white font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-6 py-4 glass rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all font-medium relative w-full md:w-auto"
                        >
                            <Filter className="w-5 h-5" /> Filters
                            {activeFiltersCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>

                        {/* Backdrop */}
                        {showFilters && (
                            <div
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                                onClick={() => setShowFilters(false)}
                            ></div>
                        )}

                        {/* Filter Dropdown */}
                        {showFilters && (
                            <div className="fixed md:absolute left-0 right-0 md:right-0 md:left-auto bottom-0 md:bottom-auto md:top-full mt-0 md:mt-2 w-full md:w-96 bg-slate-900 rounded-t-3xl md:rounded-2xl p-6 md:p-8 border-t md:border border-white/10 shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
                                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-blue-400" />
                                        Filters
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={clearFilters}
                                            className="text-blue-400 text-sm hover:text-blue-300 font-medium transition-colors"
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="md:hidden w-8 h-8 flex items-center justify-center glass rounded-full hover:bg-white/10"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="mb-8">
                                    <label className="text-sm font-bold text-slate-200 mb-4 block flex items-center gap-2">
                                        💰 Price Range
                                    </label>
                                    <div className="flex gap-3 mb-4">
                                        <div className="flex-1">
                                            <label className="text-xs text-slate-400 mb-1 block">Min</label>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs text-slate-400 mb-1 block">Max</label>
                                            <input
                                                type="number"
                                                placeholder="5000"
                                                className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000"
                                            step="100"
                                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        />
                                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                                            <span>৳0</span>
                                            <span>৳5000</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Minimum Rating */}
                                <div className="mb-8">
                                    <label className="text-sm font-bold text-slate-200 mb-4 block flex items-center gap-2">
                                        ⭐ Minimum Rating
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[0, 3, 4, 4.5].map(rating => (
                                            <button
                                                key={rating}
                                                onClick={() => setMinRating(rating)}
                                                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border ${minRating === rating
                                                    ? 'gradient-bg text-white border-blue-500 shadow-lg shadow-blue-500/30'
                                                    : 'glass border-white/10 hover:bg-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                {rating === 0 ? 'All' : `${rating}+`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort By */}
                                <div className="mb-2">
                                    <label className="text-sm font-bold text-slate-200 mb-4 block flex items-center gap-2">
                                        🔄 Sort By
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all bg-transparent"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="default" className="bg-slate-800">Default Order</option>
                                        <option value="price-low" className="bg-slate-800">Price: Low to High</option>
                                        <option value="price-high" className="bg-slate-800">Price: High to Low</option>
                                        <option value="rating" className="bg-slate-800">Highest Rated First</option>
                                    </select>
                                </div>

                                {/* Apply Button for Mobile */}
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="w-full mt-6 py-4 gradient-bg rounded-xl font-bold text-white hover-glow transition-all md:hidden"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active Filters Display */}
                {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {(priceRange[0] !== 0 || priceRange[1] !== 5000) && (
                            <span className="px-3 py-1 glass rounded-full text-xs font-medium">
                                Price: ৳{priceRange[0]} - ৳{priceRange[1]}
                            </span>
                        )}
                        {minRating > 0 && (
                            <span className="px-3 py-1 glass rounded-full text-xs font-medium">
                                Rating: {minRating}+ ⭐
                            </span>
                        )}
                        {sortBy !== 'default' && (
                            <span className="px-3 py-1 glass rounded-full text-xs font-medium">
                                Sort: {sortBy === 'price-low' ? 'Price ↑' : sortBy === 'price-high' ? 'Price ↓' : 'Rating ↓'}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {loading ? (
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="glass h-[400px] rounded-3xl animate-pulse bg-white/5"></div>
                    ))}
                </div>
            ) : currentServices.length > 0 ? (
                <>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {currentServices.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="glass rounded-[32px] overflow-hidden border-white/5 hover:border-blue-500/30 transition-all group shadow-xl"
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 px-3 py-1 glass rounded-full text-xs font-bold text-white flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {service.rating || '5.0'}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{service.name}</h3>
                                        <span className="text-blue-400 font-bold">৳{service.price}</span>
                                    </div>
                                    <p className="text-slate-300 text-sm line-clamp-2 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <MapPin className="w-3 h-3" /> Local
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <Tag className="w-3 h-3" /> Professional
                                        </div>
                                    </div>
                                    <Link
                                        href={`/services/${service.id}`}
                                        className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 transition-all"
                                    >
                                        View Details <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-3 glass rounded-xl hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1
                                            ? 'gradient-bg text-white shadow-lg'
                                            : 'glass hover:bg-white/10'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-3 glass rounded-xl hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 glass rounded-3xl border-dashed border-white/20">
                    <p className="text-slate-400 text-lg">No services found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default ServicesPage;
