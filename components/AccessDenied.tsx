import React from 'react';
import Card from './Card';
import { LockClosedIcon } from './Icons';

const AccessDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <Card className="max-w-md w-full text-center p-8">
        <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center">
          <LockClosedIcon className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-brand-gray-800">Acesso Negado</h2>
        <p className="mt-2 text-brand-gray-600">
          Você não tem permissão para visualizar esta página. Por favor, entre em contato com um administrador se você acredita que isso é um erro.
        </p>
      </Card>
    </div>
  );
};

export default AccessDenied;