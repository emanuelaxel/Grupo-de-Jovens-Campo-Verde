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

const pagePermissions: { [key in Page]?: Role[] } = {
    'Finanças': ['Líder', 'Pastor', 'Tesoureiro'],
    'Permissões': ['Líder', 'Pastor', 'Regente', 'Tesoureiro'],
    'Membros': ['Líder', 'Pastor'],
};

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('Dashboard');
    const [sessionEmail, setSessionEmail] = useState<string | null>(null);
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        // Initialize members from localStorage or data.tsx
        try {
            const storedMembers = localStorage.getItem('app_members');
            if (storedMembers) {
                setMembers(JSON.parse(storedMembers));
            } else {
                localStorage.setItem('app_members', JSON.stringify(appData.membersPage.members));
                setMembers(appData.membersPage.members);
            }
        } catch (error) {
            console.error("Failed to load members:", error);
            setMembers(appData.membersPage.members);
        }
        
        // Check for active session
        const activeSessionEmail = sessionStorage.getItem('app_session_email');
        if (activeSessionEmail) {
            setSessionEmail(activeSessionEmail);
        }
    }, []);

    const updateMembers = (newMembers: Member[]) => {
        setMembers(newMembers);
        localStorage.setItem('app_members', JSON.stringify(newMembers));
    };
    
    const handleLogin = (email: string) => {
        setSessionEmail(email);
        sessionStorage.setItem('app_session_email', email);
    };

    const handleLogout = () => {
        setSessionEmail(null);
        sessionStorage.removeItem('app_session_email');
        setPage('Dashboard');
    };

    const currentUserProfile: Member | undefined = useMemo(() => {
        return members.find(m => m.email === sessionEmail);
    }, [sessionEmail, members]);
    
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
                // Pass current members and the update function
                return <Members initialData={{ ...appData.membersPage, members }} setMembers={updateMembers} currentUserRole={currentUserRole} />;
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
    
    if (!sessionEmail || !currentUserProfile) {
        return <Auth onLogin={handleLogin} allMembers={members} />;
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
