import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Studies from './pages/Studies';
import Members from './pages/Members';
import Resources from './pages/Resources';
import Finances from './pages/Finances';
import Permissions from './pages/Permissions';
import Polls from './pages/Polls';
import Auth from './pages/Auth';
import AccessDenied from './components/AccessDenied';
import { appData } from './data';
import { Page, Role, Member } from './types';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';

const pagePermissions: { [key in Page]?: Role[] } = {
    'Finanças': ['Líder', 'Pastor', 'Tesoureiro'],
    'Permissões': ['Líder', 'Pastor', 'Regente', 'Tesoureiro'],
    'Membros': ['Líder', 'Pastor', 'Regente', 'Tesoureiro'],
};

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [currentUserProfile, setCurrentUserProfile] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<Page>('Dashboard');

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (session?.user) {
                const { data, error } = await supabase
                    .from('members')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (data) {
                    setCurrentUserProfile(data);
                } else if (error) {
                    console.error('Error fetching user profile:', error);
                }
            } else {
                setCurrentUserProfile(null);
            }
        };

        fetchUserProfile();
    }, [session]);


    const handleLogout = async () => {
        await supabase.auth.signOut();
        setPage('Dashboard');
    };

    const currentUserRole = currentUserProfile?.role || 'Membro';

    const hasAccess = useMemo(() => {
        const requiredRoles = pagePermissions[page];
        if (!requiredRoles) {
            return true; 
        }
        return requiredRoles.includes(currentUserRole);
    }, [page, currentUserRole]);

    const renderPage = () => {
        if (!hasAccess) {
            return <AccessDenied />;
        }

        switch (page) {
            case 'Dashboard':
                return <Dashboard data={appData.dashboard} currentUserRole={currentUserRole} />;
            case 'Eventos':
                return <Events currentUserRole={currentUserRole} />;
            case 'Estudos':
                return <Studies currentUserRole={currentUserRole} />;
            case 'Membros':
                return <Members data={appData.membersPage} currentUserRole={currentUserRole} />;
            case 'Recursos':
                return <Resources currentUserRole={currentUserRole} />;
            case 'Finanças':
                return <Finances data={appData.finances} />;
            case 'Permissões':
                return <Permissions data={appData.permissionsPage} currentUserRole={currentUserRole} />;
            case 'Enquetes':
                 return <Polls />;
            default:
                return <Dashboard data={appData.dashboard} currentUserRole={currentUserRole} />;
        }
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Carregando...</div>;
    }

    if (!session) {
        return <Auth />;
    }

    return (
        <div className="flex h-screen bg-brand-gray-100 font-sans">
            <Sidebar currentPage={page} setPage={setPage} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto">
                <Header page={page} onLogout={handleLogout} currentUserProfile={currentUserProfile} />
                <div className="p-8">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

export default App;
