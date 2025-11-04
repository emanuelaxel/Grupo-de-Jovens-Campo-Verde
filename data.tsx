import React from 'react';
import { AppData } from './types';
import { 
    BarChartIcon, UsersIcon, BookOpenIcon, CalendarIcon, TrendingUpIcon, 
    TrendingDownIcon, DollarSignIcon, CreditCardIcon, FileTextIcon, 
    PlayIcon, LinkIcon, ShieldIcon, PencilIcon, EyeIcon, UsersGroupIcon,
    MegaphoneIcon
} from './components/Icons';

export const appData: AppData = {
    dashboard: {
        stats: [
            { label: 'Total de Membros', value: '0', icon: <UsersIcon className="w-6 h-6 text-white" />, color: 'bg-blue-500' },
            { label: 'Próximos Eventos', value: '0', icon: <CalendarIcon className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
            { label: 'Estudos Ativos', value: '0', icon: <BookOpenIcon className="w-6 h-6 text-white" />, color: 'bg-green-500' },
            { label: 'Saldo Atual', value: 'R$ 0,00', icon: <DollarSignIcon className="w-6 h-6 text-white" />, color: 'bg-yellow-500' }
        ],
        upcomingEvents: [],
        ongoingStudies: [],
        pendingApprovals: [
            { id: 1, name: 'Carlos Andrade', email: 'carlos.a@email.com', requestDate: 'Hoje às 10:30' },
            { id: 2, name: 'Mariana Costa', email: 'mari.costa@email.com', requestDate: 'Ontem às 18:45' }
        ]
    },
    events: [],
    studies: [],
    membersPage: {
        stats: [
            { label: 'Membros Ativos', value: '0', icon: <UsersIcon className="w-6 h-6"/>, iconBgColor: 'bg-blue-100', iconTextColor: 'text-blue-600' },
            { label: 'Novos Membros (Mês)', value: '+0', icon: <TrendingUpIcon className="w-6 h-6"/>, iconBgColor: 'bg-green-100', iconTextColor: 'text-green-600' },
            { label: 'Aniversariantes (Mês)', value: '0', icon: <CalendarIcon className="w-6 h-6"/>, iconBgColor: 'bg-yellow-100', iconTextColor: 'text-yellow-600' },
        ],
        members: []
    },
    resources: [],
    finances: {
        stats: [
            { label: 'Saldo Atual', value: 'R$ 0,00', icon: <DollarSignIcon className="w-5 h-5 text-brand-gray-600" /> },
            { label: 'Receitas (Mês)', value: 'R$ 0,00', icon: <TrendingUpIcon className="w-5 h-5 text-green-600" /> },
            { label: 'Despesas (Mês)', value: 'R$ 0,00', icon: <TrendingDownIcon className="w-5 h-5 text-red-600" /> },
            { label: 'Meta de Arrecadação', value: 'R$ 3.000,00', icon: <CreditCardIcon className="w-5 h-5 text-brand-gray-600" />, progress: 0, change: '0% atingido' },
        ],
        incomeVsExpense: [],
        incomeByCategory: [],
        expenseByCategory: [],
        recentTransactions: []
    },
    permissionsPage: {
        roles: [
            { id: 'Líder', name: 'Líder', description: 'Acesso total e gerenciamento do sistema.', icon: <ShieldIcon className="w-5 h-5 text-purple-600" /> },
            { id: 'Pastor', name: 'Pastor', description: 'Acesso de supervisão e gerenciamento.', icon: <ShieldIcon className="w-5 h-5 text-red-600" /> },
            { id: 'Regente', name: 'Regente', description: 'Gerencia ensaios e eventos de louvor.', icon: <UsersGroupIcon className="w-5 h-5 text-pink-600" /> },
            { id: 'Tesoureiro', name: 'Tesoureiro', description: 'Acesso e gerenciamento financeiro.', icon: <CreditCardIcon className="w-5 h-5 text-blue-600" /> },
            { id: 'Membro', name: 'Membro', description: 'Acesso básico para visualização.', icon: <UsersIcon className="w-5 h-5 text-gray-600" /> },
        ],
        permissionCategories: [
            { id: 'general', name: 'Geral', icon: <EyeIcon className="w-6 h-6 text-brand-gray-500" />, permissions: [
                { name: 'Ver Dashboard', leader: true, pastor: true, regente: true, treasurer: true, member: true },
                { name: 'Ver Eventos', leader: true, pastor: true, regente: true, treasurer: true, member: true },
                { name: 'Ver Estudos', leader: true, pastor: true, regente: true, treasurer: true, member: true },
            ]},
            { id: 'management', name: 'Gerenciamento', icon: <PencilIcon className="w-6 h-6 text-brand-gray-500" />, permissions: [
                { name: 'Gerenciar Eventos', leader: true, pastor: true, regente: true, treasurer: true, member: false },
                { name: 'Gerenciar Estudos', leader: true, pastor: true, regente: false, treasurer: true, member: false },
                { name: 'Gerenciar Membros', leader: true, pastor: true, regente: false, treasurer: true, member: false },
                { name: 'Gerenciar Finanças', leader: true, pastor: true, regente: false, treasurer: true, member: false },
            ]},
        ],
        individualPermissionMembers: [],
        currentUser: {
            role: 'Líder',
            description: 'Como Líder, você possui acesso total para visualizar e gerenciar todas as seções do painel.',
            activePermissions: ['Ver Dashboard', 'Ver Eventos', 'Ver Estudos', 'Gerenciar Eventos', 'Gerenciar Estudos', 'Gerenciar Membros', 'Gerenciar Finanças']
        }
    },
    polls: []
};