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
import { Page, Role } from './types';

const pagePermissions: { [key in Page]?: Role[] } = {
    'Finanças': ['Líder', 'Pastor', 'Tesoureiro'],
    'Permissões': ['Líder', 'Pastor', 'Regente', 'Tesoureiro'],
    'Membros': ['Líder', 'Pastor', 'Regente', 'Tesoureiro'],
};

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [page, setPage] = useState<Page>('Dashboard');
    const [currentUserRole, setCurrentUserRole] = useState<Role>('Membro');

    // Simulate role selection on login from Auth.tsx
    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (!storedEmail) {
            setCurrentUserRole('Membro'); // Default if no one is logged in
            return;
        }

        // Hardcoded users
        if (storedEmail === 'lider@email.com') {
            setCurrentUserRole('Líder');
            return;
        } 
        if (storedEmail === 'emanoelaxl@hotmail.com') {
            setCurrentUserRole('Pastor');
            return;
        }
        
        // Check dynamic users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
        const currentUser = storedUsers.find((user: any) => user.email === storedEmail);
        
        if (currentUser) {
            setCurrentUserRole(currentUser.role);
        } else {
            setCurrentUserRole('Membro'); // Fallback to default role
        }

    }, [isAuthenticated]);


    const handleLoginSuccess = (email: string) => {
        localStorage.setItem('userEmail', email);
        setIsAuthenticated(true);
        setPage('Dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setIsAuthenticated(false);
    };

    const hasAccess = useMemo(() => {
        const requiredRoles = pagePermissions[page];
        if (!requiredRoles) {
            return true; // Page is public within the app
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
                return <Events initialEvents={appData.events} currentUserRole={currentUserRole} />;
            case 'Estudos':
                return <Studies initialStudies={appData.studies} currentUserRole={currentUserRole} />;
            case 'Membros':
                return <Members data={appData.membersPage} currentUserRole={currentUserRole} />;
            case 'Recursos':
                return <Resources initialResources={appData.resources} currentUserRole={currentUserRole} />;
            case 'Finanças':
                return <Finances data={appData.finances} />;
            case 'Permissões':
                return <Permissions data={appData.permissionsPage} currentUserRole={currentUserRole} />;
            case 'Enquetes':
                 return <Polls initialPolls={appData.polls} />;
            default:
                return <Dashboard data={appData.dashboard} currentUserRole={currentUserRole} />;
        }
    };

    if (!isAuthenticated) {
        return <Auth onLoginSuccess={(email) => handleLoginSuccess(email)} />;
    }

    return (
        <div className="flex h-screen bg-brand-gray-100 font-sans">
            <Sidebar currentPage={page} setPage={setPage} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto">
                <Header page={page} onLogout={handleLogout} currentUserRole={currentUserRole} />
                <div className="p-8">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

export default App;