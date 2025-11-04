
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Page, Role } from '../types';
import { BellIcon, ChevronDownIcon, SearchIcon, LogoutIcon } from './Icons';

interface HeaderProps {
  page: Page;
  onLogout: () => void;
  currentUserRole: Role;
}

const Header: React.FC<HeaderProps> = ({ page, onLogout, currentUserRole }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = useMemo(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return { name: 'Usuário', initials: 'U' };

    const namePart = email.split('@')[0];
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[^a-zA-Z0-9]/g, '');
    const initials = (name[0] || '').toUpperCase();
    
    return { name, initials };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-white/60 backdrop-blur-md p-4 sticky top-0 z-10 border-b border-brand-gray-200/60">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-gray-800">{page}</h1>
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <SearchIcon className="w-5 h-5 text-brand-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar..." className="w-full bg-brand-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple-light text-brand-gray-700" />
          </div>
          <button className="relative text-brand-gray-500 hover:text-brand-gray-800">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-purple-500 to-indigo-600">
                {currentUser.initials}
              </div>
              <div>
                <p className="font-semibold text-sm text-brand-gray-800">{currentUser.name}</p>
                <p className="text-xs text-brand-gray-500">{currentUserRole}</p>
              </div>
              <ChevronDownIcon className={`w-5 h-5 text-brand-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-brand-gray-200/80">
                <button
                  onClick={onLogout}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-brand-gray-700 hover:bg-brand-gray-100"
                >
                  <LogoutIcon className="w-5 h-5 text-brand-gray-500" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;