
"use client";
import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import UserDashboard from '@/components/dashboard/UserDashboard';
import ProviderDashboard from '@/components/dashboard/ProviderDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const DashboardPage = () => {
    const router = useRouter();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cookies = parseCookies();
        if (!cookies.auth_token) {
            router.push('/login');
            return;
        }
        setRole(cookies.user_role || 'user');
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <>
            {role === 'user' && <UserDashboard />}
            {role === 'provider' && <ProviderDashboard />}
            {role === 'admin' && <AdminDashboard />}
        </>
    );
};

export default DashboardPage;
