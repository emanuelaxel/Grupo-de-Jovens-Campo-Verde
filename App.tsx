import React, { useState, useMemo } from 'react';
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
import AccessDenied from './components/AccessDenied';
import { appData } from './data';
import { Page, Role, Member } from './types';

const pagePermissions: { [key in Page]?: Role[] } = {
    'Finanças': ['Líder', 'Pastor', 'Tesoureiro'],
    'Permissões': ['Líder', 'Pastor', 'Regente', 'Tesoureiro'],
    'Membros': ['Líder', 'Pastor', 'Regente', 'Tesoureiro'],
};

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('Dashboard');
    
    // Reverted to a static user, assuming the first 'Líder' from mock data.
    const [currentUserProfile] = useState<Member>(
        appData.membersPage.members.find(m => m.role === 'Líder') || appData.membersPage.members[0]
    );

    const handleLogout = () => {
        // In a real app, this would clear session. Here we can just reset to dashboard.
        console.log("Logout triggered");
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