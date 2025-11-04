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
            { label: 'Total de Membros', value: '74', icon: <UsersIcon className="w-6 h-6 text-white" />, color: 'bg-blue-500' },
            { label: 'Próximos Eventos', value: '3', icon: <CalendarIcon className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
            { label: 'Estudos Ativos', value: '5', icon: <BookOpenIcon className="w-6 h-6 text-white" />, color: 'bg-green-500' },
            { label: 'Saldo Atual', value: 'R$ 2.450', icon: <DollarSignIcon className="w-6 h-6 text-white" />, color: 'bg-yellow-500' }
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
        { id: 1, title: 'Fundamentos da Fé', description: 'Uma série de estudos sobre as doutrinas básicas da fé cristã, ideal para novos convertidos.', theme: 'Doutrina', scripture: 'Hebreus 6:1-2', leader: 'Pastor João', schedule: 'Sábados, 17:00', progress: 75, lessons: [{id: 1, title: "A Salvação", questions: []}], materialUrl: '#', comments: [{id: 1, authorName: 'Ana Silva', authorInitials: 'AS', authorAvatarColor: 'bg-gradient-to-br from-purple-500 to-indigo-600', text: 'Estudo muito edificante!', timestamp: '2 dias atrás'}] },
        { id: 2, title: 'O Sermão do Monte', description: 'Um estudo aprofundado sobre os ensinamentos de Jesus em Mateus 5-7.', theme: 'Evangelhos', scripture: 'Mateus 5-7', leader: 'Líder Ana Silva', schedule: 'Quartas, 20:00', progress: 40, lessons: [{id: 1, title: "As Bem-aventuranças", questions: []}], comments: [] },
    ],
    membersPage: {
        stats: [
            { label: 'Membros Ativos', value: '74', icon: <UsersIcon className="w-6 h-6"/>, iconBgColor: 'bg-blue-100', iconTextColor: 'text-blue-600' },
            { label: 'Novos Membros (Mês)', value: '+3', icon: <TrendingUpIcon className="w-6 h-6"/>, iconBgColor: 'bg-green-100', iconTextColor: 'text-green-600' },
            { label: 'Aniversariantes (Mês)', value: '8', icon: <CalendarIcon className="w-6 h-6"/>, iconBgColor: 'bg-yellow-100', iconTextColor: 'text-yellow-600' },
        ],
        members: [
            { id: 1, name: 'Ana Silva', initials: 'AS', avatarColor: 'bg-gradient-to-br from-purple-500 to-indigo-600', role: 'Líder', email: 'ana.silva@email.com', phone: '(11) 98765-4321', joinDate: '2018', eventsAttended: 48, studiesCompleted: 12 },
            { id: 2, name: 'Bruno Gomes', initials: 'BG', avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-500', role: 'Tesoureiro', email: 'bruno.gomes@email.com', phone: '(11) 91234-5678', joinDate: '2020', eventsAttended: 35, studiesCompleted: 8 },
            { id: 3, name: 'Carla Dias', initials: 'CD', avatarColor: 'bg-gradient-to-br from-pink-500 to-rose-500', role: 'Regente', email: 'carla.dias@email.com', phone: '(11) 95555-4444', joinDate: '2019', eventsAttended: 41, studiesCompleted: 10 },
            { id: 4, name: 'Daniel Alves', initials: 'DA', avatarColor: 'bg-gradient-to-br from-green-500 to-lime-500', role: 'Membro', email: 'daniel.alves@email.com', phone: '(11) 93333-2222', joinDate: '2022', eventsAttended: 22, studiesCompleted: 4 },
        ]
    },
    resources: [
        { id: 1, title: 'Apostila - Fundamentos da Fé', description: 'Material completo do estudo sobre os fundamentos da fé.', category: 'Estudos', type: 'file', icon: <FileTextIcon />, action: 'Download', details: 'PDF, 2.5MB', url: '#' },
        { id: 2, title: 'Pregação - Culto de Jovens', description: 'Gravação da última mensagem do culto de jovens.', category: 'Mensagens', type: 'audio', icon: <PlayIcon />, action: 'Ouvir', details: 'MP3, 45min', url: '#' },
        { id: 3, title: 'Hinário Cifrado', description: 'Link para o hinário online com cifras para violão.', category: 'Louvor', type: 'link', icon: <LinkIcon />, action: 'Acessar', url: '#', details: 'Website Externo' },
    ],
    finances: {
        stats: [
            { label: 'Saldo Atual', value: 'R$ 2.450,75', icon: <DollarSignIcon className="w-5 h-5 text-brand-gray-600" /> },
            { label: 'Receitas (Mês)', value: 'R$ 1.870,00', icon: <TrendingUpIcon className="w-5 h-5 text-green-600" /> },
            { label: 'Despesas (Mês)', value: 'R$ 920,50', icon: <TrendingDownIcon className="w-5 h-5 text-red-600" /> },
            { label: 'Meta de Arrecadação', value: 'R$ 3.000,00', icon: <CreditCardIcon className="w-5 h-5 text-brand-gray-600" />, progress: 62, change: '62% atingido' },
        ],
        incomeVsExpense: [
            { month: 'Jan', income: 1200, expense: 800 }, { month: 'Fev', income: 1500, expense: 1000 },
            { month: 'Mar', income: 1300, expense: 1100 }, { month: 'Abr', income: 1800, expense: 900 },
            { month: 'Mai', income: 1700, expense: 1300 }, { month: 'Jun', income: 1870, expense: 920 },
        ],
        incomeByCategory: [
            { name: 'Dízimos', percentage: 50, value: 935, color: 'bg-teal-500' },
            { name: 'Ofertas', percentage: 30, value: 561, color: 'bg-green-400' },
            { name: 'Cantina', percentage: 20, value: 374, color: 'bg-lime-400' },
        ],
        expenseByCategory: [
            { name: 'Eventos', percentage: 40, value: 368.2, color: 'bg-cyan-500' },
            { name: 'Materiais', percentage: 25, value: 230.13, color: 'bg-purple-500' },
            { name: 'Confraternização', percentage: 35, value: 322.17, color: 'bg-indigo-500' },
        ],
        recentTransactions: [
            { id: 1, description: 'Oferta do Culto de Jovens', category: 'Ofertas', amount: '+ R$ 345,00', date: '26/06/2024', type: 'income' },
            { id: 2, description: 'Compra de descartáveis', category: 'Eventos', amount: '- R$ 88,90', date: '25/06/2024', type: 'expense' },
        ]
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
                { name: 'Gerenciar Eventos', leader: true, pastor: true, regente: true, treasurer: false, member: false },
                { name: 'Gerenciar Estudos', leader: true, pastor: true, regente: false, treasurer: false, member: false },
                { name: 'Gerenciar Membros', leader: true, pastor: true, regente: false, treasurer: false, member: false },
                { name: 'Gerenciar Finanças', leader: true, pastor: true, regente: false, treasurer: true, member: false },
            ]},
        ],
        individualPermissionMembers: [
            { id: 2, name: 'Bruno Gomes', initials: 'BG', role: 'Tesoureiro', avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-500', extraPermissions: ['Gerenciar Eventos'] },
            { id: 4, name: 'Daniel Alves', initials: 'DA', role: 'Membro', avatarColor: 'bg-gradient-to-br from-green-500 to-lime-500', extraPermissions: [] },
        ],
        currentUser: {
            role: 'Líder',
            description: 'Como Líder, você possui acesso total para visualizar e gerenciar todas as seções do painel.',
            activePermissions: ['Ver Dashboard', 'Ver Eventos', 'Ver Estudos', 'Gerenciar Eventos', 'Gerenciar Estudos', 'Gerenciar Membros', 'Gerenciar Finanças']
        }
    },
    polls: [
        { id: 1, question: "Qual o melhor dia para o nosso próximo mutirão de limpeza?", createdBy: 'Ana Silva', createdAt: '01/07/2024', totalVotes: 25, voted: false, options: [
            { id: 1, text: 'Sábado de manhã (09:00)', votes: 15 },
            { id: 2, text: 'Sábado à tarde (14:00)', votes: 7 },
            { id: 3, text: 'Domingo após o culto', votes: 3 },
        ]},
        { id: 2, question: "Qual tema você gostaria de ver no próximo estudo bíblico?", createdBy: 'Pastor João', createdAt: '28/06/2024', totalVotes: 42, voted: true, options: [
            { id: 1, text: 'Apocalipse', votes: 22 },
            { id: 2, text: 'Relacionamentos Cristãos', votes: 11 },
            { id: 3, text: 'Batalha Espiritual', votes: 9 },
        ]},
    ]
};
