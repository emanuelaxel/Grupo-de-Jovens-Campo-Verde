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
            { label: 'Próximos Eventos', value: '3', icon: <CalendarIcon className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
            { label: 'Estudos Ativos', value: '5', icon: <BookOpenIcon className="w-6 h-6 text-white" />, color: 'bg-green-500' },
            { label: 'Saldo Atual', value: 'R$ 0,00', icon: <DollarSignIcon className="w-6 h-6 text-white" />, color: 'bg-yellow-500' }
        ],
        upcomingEvents: [
            { id: 1, title: 'Culto de Jovens', month: 'JUL', day: '28', time: '19:00', location: 'Templo Sede', attendees: '45 confirmados', date: '2024-07-28', description: '', category: '', categoryColor: '', maxAttendees: 100, confirmedAttendees: 45 },
            { id: 2, title: 'Ensaio do Coral', month: 'AGO', day: '03', time: '16:00', location: 'Sala de Música', attendees: '22 confirmados', date: '2024-08-03', description: '', category: '', categoryColor: '', maxAttendees: 30, confirmedAttendees: 22 },
        ],
        ongoingStudies: [
            { id: 1, title: 'Livro de Romanos', scripture: 'Romanos 1-8', progress: 60, lessons: [], description: '', leader: '', schedule: '', theme: '' },
            { id: 2, title: 'As Parábolas de Jesus', scripture: 'Evangelhos Sinóticos', progress: 35, lessons: [], description: '', leader: '', schedule: '', theme: '' }
        ],
        pendingApprovals: [
            { id: 1, name: 'Carlos Andrade', email: 'carlos.a@email.com', requestDate: 'Hoje às 10:30' },
            { id: 2, name: 'Mariana Costa', email: 'mari.costa@email.com', requestDate: 'Ontem às 18:45' }
        ]
    },
    events: [
        { id: 1, title: 'Culto de Jovens Mensal', description: 'Nosso encontro mensal para adoração, palavra e comunhão. Venha e traga um amigo!', date: '2024-07-28', time: '19:00', location: 'Templo Sede', category: 'Culto', categoryColor: 'bg-red-200 text-red-800', month: 'JUL', day: '28', maxAttendees: 150, confirmedAttendees: 45, bannerUrl: 'https://via.placeholder.com/600x200.png/6D28D9/FFFFFF?text=Culto+de+Jovens' },
        { id: 2, title: 'Tarde de Esportes', description: 'Uma tarde divertida com vôlei, futebol e muita diversão no parque da cidade.', date: '2024-08-10', time: '15:00', location: 'Parque Central', category: 'Lazer', categoryColor: 'bg-green-200 text-green-800', month: 'AGO', day: '10', maxAttendees: 50, confirmedAttendees: 18, bannerUrl: 'https://via.placeholder.com/600x200.png/10B981/FFFFFF?text=Esportes' },
        { id: 3, title: 'Noite de Louvor e Adoração', description: 'Uma noite especial dedicada a adorar a Deus com canções e orações.', date: '2024-08-24', time: '19:30', location: 'Templo Sede', category: 'Louvor', categoryColor: 'bg-blue-200 text-blue-800', month: 'AGO', day: '24', maxAttendees: 120, confirmedAttendees: 77, bannerUrl: 'https://via.placeholder.com/600x200.png/3B82F6/FFFFFF?text=Louvor' },
    ],
    studies: [
        { id: 1, title: 'Fundamentos da Fé', description: 'Uma série de estudos sobre as doutrinas básicas da fé cristã, ideal para novos convertidos.', theme: 'Doutrina', scripture: 'Hebreus 6:1-2', leader: 'A Definir', schedule: 'Sábados, 17:00', progress: 75, lessons: [{id: 1, title: "A Salvação", questions: []}], materialUrl: '#', comments: [] },
        { id: 2, title: 'O Sermão do Monte', description: 'Um estudo aprofundado sobre os ensinamentos de Jesus em Mateus 5-7.', theme: 'Evangelhos', scripture: 'Mateus 5-7', leader: 'A Definir', schedule: 'Quartas, 20:00', progress: 40, lessons: [{id: 1, title: "As Bem-aventuranças", questions: []}], comments: [] },
    ],
    membersPage: {
        stats: [
            { label: 'Membros Ativos', value: '0', icon: <UsersIcon className="w-6 h-6"/>, iconBgColor: 'bg-blue-100', iconTextColor: 'text-blue-600' },
            { label: 'Novos Membros (Mês)', value: '+0', icon: <TrendingUpIcon className="w-6 h-6"/>, iconBgColor: 'bg-green-100', iconTextColor: 'text-green-600' },
            { label: 'Aniversariantes (Mês)', value: '0', icon: <CalendarIcon className="w-6 h-6"/>, iconBgColor: 'bg-yellow-100', iconTextColor: 'text-yellow-600' },
        ],
        members: []
    },
    resources: [
        { id: 1, title: 'Apostila - Fundamentos da Fé', description: 'Material completo do estudo sobre os fundamentos da fé.', category: 'Estudos', type: 'file', icon: <FileTextIcon />, action: 'Download', details: 'PDF, 2.5MB', url: '#' },
        { id: 2, title: 'Pregação - Culto de Jovens', description: 'Gravação da última mensagem do culto de jovens.', category: 'Mensagens', type: 'audio', icon: <PlayIcon />, action: 'Ouvir', details: 'MP3, 45min', url: '#' },
        { id: 3, title: 'Hinário Cifrado', description: 'Link para o hinário online com cifras para violão.', category: 'Louvor', type: 'link', icon: <LinkIcon />, action: 'Acessar', url: '#', details: 'Website Externo' },
    ],
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