import React, { useState } from 'react';
import { LogoIcon } from '../components/Icons';

interface AuthProps {
  onLoginSuccess: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgotPassword'>('login');
  
  // State for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // State for registration
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerDob, setRegisterDob] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerBaptismDate, setRegisterBaptismDate] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check hardcoded users first
    if ((loginEmail === 'lider@email.com' && loginPassword === '123456') || (loginEmail === 'emanoelaxl@hotmail.com' && loginPassword === 'axel12345@')) {
      setLoginError('');
      onLoginSuccess(loginEmail);
      return;
    }

    // Check users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
    const foundUser = storedUsers.find(
      (user: any) => user.email === loginEmail && user.password === loginPassword
    );

    if (foundUser) {
        setLoginError('');
        onLoginSuccess(loginEmail);
    } else {
        setLoginError('E-mail ou senha inválidos.');
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you would send this data to a server.
      // For this demo, we'll just show a success message.
      setRegisterSuccess(true);
  }

  const renderContent = () => {
    if (authMode === 'register') {
      return (
        <>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center text-brand-gray-900">Criar Nova Conta</h2>
              <p className="mt-2 text-sm text-center text-brand-gray-500">Preencha os campos para se registrar</p>
            </div>
            {registerSuccess ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                    <h3 className="font-semibold">Cadastro enviado com sucesso!</h3>
                    <p className="text-sm">Seu acesso será liberado após a aprovação de um líder.</p>
                </div>
            ) : (
                <form className="mt-8 space-y-4" onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <input placeholder="Nome completo" required className="input-field" type="text" value={registerName} onChange={e => setRegisterName(e.target.value)} />
                         <input placeholder="E-mail" required className="input-field" type="email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
                         <input placeholder="Senha" required className="input-field" type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
                         <input placeholder="Data de Nascimento" required className="input-field" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} value={registerDob} onChange={e => setRegisterDob(e.target.value)} />
                         <input placeholder="Telefone" required className="input-field" type="tel" value={registerPhone} onChange={e => setRegisterPhone(e.target.value)} />
                         <input placeholder="Endereço" required className="input-field" type="text" value={registerAddress} onChange={e => setRegisterAddress(e.target.value)} />
                         <input placeholder="Data de Batismo (opcional)" className="input-field md:col-span-2" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} value={registerBaptismDate} onChange={e => setRegisterBaptismDate(e.target.value)} />
                    </div>
                   
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-brand-purple hover:bg-brand-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple">
                            Cadastrar
                        </button>
                    </div>
                </form>
            )}
            <div className="text-center text-sm text-brand-gray-500">
                Já tem uma conta?{' '}
                <button onClick={() => setAuthMode('login')} className="font-medium text-brand-purple hover:text-brand-purple-dark">
                    Faça login
                </button>
            </div>
        </>
      );
    }

    if (authMode === 'forgotPassword') {
        return (
             <>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-center text-brand-gray-900">Recuperar Senha</h2>
                    <p className="mt-2 text-sm text-center text-brand-gray-500">Digite seu e-mail para receber o link de recuperação</p>
                </div>
                <form className="mt-8 space-y-6">
                    <input placeholder="Seu e-mail" required className="input-field" type="email" />
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-brand-purple hover:bg-brand-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple">
                            Enviar link de recuperação
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-brand-gray-500">
                    Lembrou a senha?{' '}
                    <button onClick={() => setAuthMode('login')} className="font-medium text-brand-purple hover:text-brand-purple-dark">
                        Faça login
                    </button>
                </div>
            </>
        )
    }

    // Default to login view
    return (
      <>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center text-brand-gray-900">Bem-vindo de volta!</h2>
          <p className="mt-2 text-sm text-center text-brand-gray-500">Faça login para acessar o painel</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              placeholder="E-mail"
              type="email"
              required
              className="input-field"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              placeholder="Senha"
              type="password"
              required
              className="input-field"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>

          {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-brand-purple focus:ring-brand-purple border-gray-300 rounded" />
              <span className="ml-2 text-brand-gray-900">Lembrar-me</span>
            </label>
            <button type="button" onClick={() => setAuthMode('forgotPassword')} className="font-medium text-brand-purple hover:text-brand-purple-dark">
              Esqueceu sua senha?
            </button>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-brand-purple hover:bg-brand-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple">
              Entrar
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm text-brand-gray-500 pt-4 border-t border-brand-gray-200">
            Não tem uma conta?{' '}
            <button onClick={() => setAuthMode('register')} className="font-medium text-brand-purple hover:text-brand-purple-dark">
                Cadastre-se
            </button>
        </div>
      </>
    );
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-gray-100 font-sans p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-lg border border-brand-gray-200/50">
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
        
        {renderContent()}
        
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