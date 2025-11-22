import React, { useState } from 'react';
import { LogoIcon } from '../components/Icons';
import { Member } from '../types';

interface AuthProps {
  onLogin: (email: string) => void;
  allMembers: Member[];
}

const Auth: React.FC<AuthProps> = ({ onLogin, allMembers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = allMembers.find(m => m.email === email);

    if (user && user.password === password) {
      onLogin(email);
    } else {
      setError('E-mail ou senha inválidos.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-gray-100 font-sans p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg border border-brand-gray-200/50">
        <div className="flex justify-center">
            <div className="flex items-center gap-3">
                 <div className="p-3 bg-brand-purple-light/20 rounded-lg">
                    <LogoIcon className="w-8 h-8 text-brand-purple" />
                 </div>
                 <div>
                    <h1 className="text-xl font-bold text-brand-gray-900">Jovens Geração Eleita</h1>
                    <p className="text-sm text-brand-gray-500">AD Belém Campo Verde</p>
                 </div>
            </div>
        </div>
        
        <div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center text-brand-gray-900">Bem-vindo!</h2>
            <p className="mt-2 text-sm text-center text-brand-gray-500">Faça login para acessar o painel</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <input
                placeholder="E-mail"
                type="email"
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Senha"
                type="password"
                required
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-brand-purple focus:ring-brand-purple border-gray-300 rounded" />
                <span className="ml-2 text-brand-gray-900">Lembrar-me</span>
              </label>
              <button type="button" className="font-medium text-brand-purple hover:text-brand-purple-dark">
                Esqueceu sua senha?
              </button>
            </div>

            <div>
              <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-brand-purple hover:bg-brand-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple disabled:bg-brand-purple/50">
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
        
      </div>
      <style>{`
        .input-field {
          appearance: none;
          position: relative;
          display: block;
          width: 100%;
          padding: 0.75rem;
          border-width: 1px;
          border-color: #CED4DA;
          placeholder-color: #6C757D;
          color: #212529;
          border-radius: 0.5rem;
        }
        .input-field:focus {
          outline: none;
          --tw-ring-color: #F3F4FB;
          --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
          --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
          box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
          border-color: #6D28D9;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default Auth;
