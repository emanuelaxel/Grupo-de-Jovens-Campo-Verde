import React from 'react';
import { Page } from '../types';
import { LogoIcon, UsersIcon, CalendarIcon, BookOpenIcon, CreditCardIcon, UsersGroupIcon, MegaphoneIcon, ShieldIcon, FileTextIcon, LogoutIcon, BarChartIcon } from './Icons';

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  onLogout: () => void;
}

// FIX: Changed JSX.Element to React.ReactNode to resolve namespace issue.
const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
  { page: 'Dashboard', label: 'Dashboard', icon: <BarChartIcon className="w-5 h-5" /> },
  { page: 'Eventos', label: 'Eventos', icon: <CalendarIcon className="w-5 h-5" /> },
  { page: 'Estudos', label: 'Estudos', icon: <BookOpenIcon className="w-5 h-5" /> },
  { page: 'Membros', label: 'Membros', icon: <UsersGroupIcon className="w-5 h-5" /> },
  { page: 'Recursos', label: 'Recursos', icon: <FileTextIcon className="w-5 h-5" /> },
  { page: 'Finanças', label: 'Finanças', icon: <CreditCardIcon className="w-5 h-5" /> },
  { page: 'Permissões', label: 'Permissões', icon: <ShieldIcon className="w-5 h-5" /> },
  { page: 'Enquetes', label: 'Enquetes', icon: <MegaphoneIcon className="w-5 h-5" /> },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage, onLogout }) => {
  return (
    <aside className="w-64 bg-white flex flex-col flex-shrink-0 border-r border-brand-gray-200/80">
      <div className="h-20 flex items-center px-6 gap-3 border-b border-brand-gray-200/80">
        <div className="p-2 bg-brand-purple-light/20 rounded-lg">
          <LogoIcon className="w-7 h-7 text-brand-purple" />
        </div>
        <div>
          <h1 className="text-md font-bold text-brand-gray-900">Geração Eleita</h1>
          <p className="text-xs text-brand-gray-500">AD Belém Campo Verde</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
          <button
            key={item.page}
            onClick={() => setPage(item.page)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              currentPage === item.page
                ? 'bg-brand-purple text-white shadow-md'
                : 'text-brand-gray-600 hover:bg-brand-gray-100 hover:text-brand-gray-900'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-brand-gray-200/80">
        <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-gray-600 hover:bg-brand-gray-100 hover:text-brand-gray-900"
        >
            <LogoutIcon className="w-5 h-5" />
            <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;