import React from 'react';
import { AppData } from './types';
import { 
    BarChartIcon, UsersIcon, BookOpenIcon, CalendarIcon, TrendingUpIcon, 
    TrendingDownIcon, DollarSignIcon, CreditCardIcon, FileTextIcon, 
    PlayIcon, LinkIcon, ShieldIcon, PencilIcon, EyeIcon, UsersGroupIcon,
    MegaphoneIcon, MusicNoteIcon, ImageIcon
} from './components/Icons';

export const appData: AppData = {
    dashboard: {
        stats: [
            { label: 'Total de Membros', value: '75', icon: <UsersIcon className="w-6 h-6 text-white" />, color: 'bg-blue-500' },
            { label: 'Próximos Eventos', value: '3', icon: <CalendarIcon className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
            { label: 'Estudos Ativos', value: '4', icon: <BookOpenIcon className="w-6 h-6 text-white" />, color: 'bg-green-500' },
            { label: 'Saldo Atual', value: 'R$ 2.580,25', icon: <DollarSignIcon className="w-6 h-6 text-white" />, color: 'bg-yellow-500' }
        ],
        upcomingEvents: [
            {
                id: 1,
                title: 'Vigília de Oração',
                date: '2024-07-26',
                time: '22:00',
                location: 'Templo Principal',
                month: 'JUL',
                day: '26',
                attendees: '35 confirmados',
                category: 'Oração',
                categoryColor: '',
                description: '',
                maxAttendees: 100,
                confirmedAttendees: 35
            },
            {
                id: 2,
                title: 'Acampadentro 2024',
                date: '2024-08-02',
                time: '19:00',
                location: 'Salão Social',
                month: 'AGO',
                day: '02',
                attendees: '58 confirmados',
                category: 'Especial',
                categoryColor: '',
                description: '',
                maxAttendees: 100,
                confirmedAttendees: 58
            },
        ],
        ongoingStudies: [
            // FIX: Added missing 'theme' property.
            { id: 1, title: 'Livro de Romanos', scripture: 'Romanos 1:16', progress: 75, leader: '', schedule: '', lessons: [], description: '', theme: 'Doutrina' },
            // FIX: Added missing 'theme' property.
            { id: 2, title: 'As Parábolas de Jesus', scripture: 'Mateus 13', progress: 40, leader: '', schedule: '', lessons: [], description: '', theme: 'Evangelhos' },
            // FIX: Added missing 'theme' property.
            { id: 3, title: 'Fundamentos da Fé', scripture: 'Hebreus 11:1', progress: 90, leader: '', schedule: '', lessons: [], description: '', theme: 'Doutrina' },
        ],
        pendingApprovals: [
            { id: 1, name: 'Carlos Pereira', email: 'carlos.p@email.com', requestDate: '2 dias atrás' },
            { id: 2, name: 'Mariana Costa', email: 'mari.costa@email.com', requestDate: '5 dias atrás' },
        ]
    },
    events: [
        {
            id: 1, title: 'Vigília de Oração', description: 'Uma noite dedicada à oração e comunhão com Deus. Venha buscar mais do Senhor conosco!', date: '2024-07-26', time: '22:00', location: 'Templo Principal', category: 'Oração', categoryColor: 'bg-blue-200 text-blue-800', month: 'JUL', day: '26', maxAttendees: 100, confirmedAttendees: 35, bannerUrl: 'https://images.unsplash.com/photo-1593113616828-f7c871871b8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 2, title: 'Acampadentro 2024', description: 'Nosso tradicional acampadentro está de volta! Prepare-se para jogos, louvor, palavra e muita diversão.', date: '2024-08-02', time: '19:00', location: 'Salão Social', category: 'Especial', categoryColor: 'bg-purple-200 text-purple-800', month: 'AGO', day: '02', maxAttendees: 80, confirmedAttendees: 58, bannerUrl: 'https://images.unsplash.com/photo-1527411633345-12b621055a41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 3, title: 'Culto de Jovens', description: 'Nosso culto mensal com a mocidade. Convide um amigo e venha adorar a Deus!', date: '2024-08-10', time: '19:30', location: 'Templo Principal', category: 'Culto', categoryColor: 'bg-yellow-200 text-yellow-800', month: 'AGO', day: '10', maxAttendees: 200, confirmedAttendees: 112, bannerUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
    ],
    studies: [
        {
            id: 1, title: 'Livro de Romanos', description: 'Um estudo profundo da carta de Paulo aos Romanos, explorando a justificação pela fé.', theme: 'Doutrina', scripture: 'Romanos 1:16', leader: 'Pr. João', schedule: 'Terças, 20h', progress: 75, lessons: [ { id: 1, title: "A Justiça de Deus", questions: [] }, { id: 2, title: "Justificação pela Fé", questions: [] } ], comments: [],
        },
        {
            id: 2, title: 'As Parábolas de Jesus', description: 'Descubra os ensinamentos de Jesus através de suas parábolas e como aplicá-los hoje.', theme: 'Evangelhos', scripture: 'Mateus 13', leader: 'Ana Silva', schedule: 'Quintas, 19h30', progress: 40, lessons: [{ id: 1, title: "O Semeador", questions: [] }], comments: [],
        }
    ],
    membersPage: {
        stats: [
            { label: 'Membros Ativos', value: '75', icon: <UsersIcon className="w-6 h-6"/>, iconBgColor: 'bg-blue-100', iconTextColor: 'text-blue-600' },
            { label: 'Novos Membros (Mês)', value: '+3', icon: <TrendingUpIcon className="w-6 h-6"/>, iconBgColor: 'bg-green-100', iconTextColor: 'text-green-600' },
            { label: 'Aniversariantes (Mês)', value: '8', icon: <CalendarIcon className="w-6 h-6"/>, iconBgColor: 'bg-yellow-100', iconTextColor: 'text-yellow-600' },
        ],
        members: [
            { id: 1, name: 'Ana Silva', initials: 'AS', avatarColor: 'bg-purple-500', role: 'Líder', email: 'ana.s@email.com', phone: '(11) 98765-4321', joinDate: 'Jan 2022', eventsAttended: 12, studiesCompleted: 5 },
            { id: 2, name: 'Bruno Gomes', initials: 'BG', avatarColor: 'bg-blue-500', role: 'Tesoureiro', email: 'bruno.g@email.com', phone: '(11) 91234-5678', joinDate: 'Mar 2021', eventsAttended: 15, studiesCompleted: 6 },
            { id: 3, name: 'Carla Dias', initials: 'CD', avatarColor: 'bg-pink-500', role: 'Regente', email: 'carla.d@email.com', phone: '(11) 95555-1234', joinDate: 'Fev 2023', eventsAttended: 8, studiesCompleted: 3 },
            { id: 4, name: 'Daniel Alves', initials: 'DA', avatarColor: 'bg-green-500', role: 'Membro', email: 'daniel.a@email.com', phone: '(11) 94321-8765', joinDate: 'Mai 2023', eventsAttended: 5, studiesCompleted: 2 },
        ]
    },
    resources: [
        { id: 1, title: 'Slides - Estudo de Romanos', description: 'Material de apoio para o estudo atual sobre o livro de Romanos.', category: 'Estudos', type: 'file', icon: <FileTextIcon className="w-8 h-8 text-blue-500" />, action: 'Download', details: 'PPTX, 3.2 MB', url: '#' },
        { id: 2, title: 'Playback - Grande é o Senhor', description: 'Playback para o ensaio do grupo de louvor.', category: 'Louvor', type: 'audio', icon: <PlayIcon className="w-8 h-8 text-teal-500" />, action: 'Ouvir', details: 'MP3, 4:15', url: '#' },
        { id: 3, title: 'Fotos do Acampadentro 2023', description: 'Confira as melhores fotos do nosso último acampamento.', category: 'Eventos', type: 'gallery', icon: <ImageIcon className="w-8 h-8 text-indigo-500"/>, action: 'Ver', url: '#'},
        { id: 4, title: 'Inscrição para o Congresso', description: 'Link para o formulário de inscrição do congresso regional de jovens.', category: 'Eventos', type: 'link', icon: <LinkIcon className="w-8 h-8 text-orange-500" />, action: 'Acessar', details: 'forms.google.com', url: '#' },
    ],
    finances: {
        stats: [
            { label: 'Saldo Atual', value: 'R$ 2.580,25', icon: <DollarSignIcon className="w-5 h-5 text-brand-gray-600" /> },
            { label: 'Receitas (Mês)', value: 'R$ 1.250,00', icon: <TrendingUpIcon className="w-5 h-5 text-green-600" /> },
            { label: 'Despesas (Mês)', value: 'R$ 480,50', icon: <TrendingDownIcon className="w-5 h-5 text-red-600" /> },
            { label: 'Meta de Arrecadação', value: 'R$ 3.000,00', icon: <CreditCardIcon className="w-5 h-5 text-brand-gray-600" />, progress: 42, change: '42% atingido' },
        ],
        incomeVsExpense: [
            { month: 'Fev', income: 900, expense: 300 },
            { month: 'Mar', income: 1100, expense: 500 },
            { month: 'Abr', income: 1300, expense: 650 },
            { month: 'Mai', income: 1200, expense: 400 },
            { month: 'Jun', income: 1500, expense: 800 },
            { month: 'Jul', income: 1250, expense: 480 },
        ],
        incomeByCategory: [
            { name: 'Dízimos', percentage: 60, value: 750, color: 'bg-teal-500' },
            { name: 'Ofertas', percentage: 25, value: 312.5, color: 'bg-green-400' },
            { name: 'Cantina', percentage: 15, value: 187.5, color: 'bg-lime-400' },
        ],
        expenseByCategory: [
            { name: 'Eventos', percentage: 50, value: 240.25, color: 'bg-cyan-500' },
            { name: 'Materiais', percentage: 30, value: 144.15, color: 'bg-purple-500' },
            { name: 'Lanches', percentage: 20, value: 96.10, color: 'bg-indigo-500' },
        ],
        recentTransactions: [
            { id: 1, description: 'Oferta do Culto de Jovens', category: 'Ofertas', amount: '+ R$ 350,00', date: '10/08/2024', type: 'income' },
            { id: 2, description: 'Compra de descartáveis', category: 'Eventos', amount: '- R$ 85,30', date: '08/08/2024', type: 'expense' },
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
            { id: 1, name: 'Ana Silva', initials: 'AS', role: 'Líder', avatarColor: 'bg-purple-500', extraPermissions: [] },
            { id: 2, name: 'Bruno Gomes', initials: 'BG', role: 'Tesoureiro', avatarColor: 'bg-blue-500', extraPermissions: ['Gerenciar Eventos'] },
        ],
        currentUser: {
            role: 'Líder',
            description: 'Como Líder, você possui acesso total para visualizar e gerenciar todas as seções do painel.',
            activePermissions: ['Ver Dashboard', 'Ver Eventos', 'Ver Estudos', 'Gerenciar Eventos', 'Gerenciar Estudos', 'Gerenciar Membros', 'Gerenciar Finanças']
        }
    },
    polls: [
        {
            id: 1,
            question: 'Qual o melhor tema para o nosso próximo retiro?',
            options: [
                { id: 1, text: 'Santidade', votes: 15 },
                { id: 2, text: 'Propósito', votes: 28 },
                { id: 3, text: 'Avivamento', votes: 12 },
            ],
            createdBy: 'Ana Silva',
            createdAt: '12/07/2024',
            totalVotes: 55,
            voted: false,
        },
        {
            id: 2,
            question: 'Qual dia da semana é melhor para o estudo bíblico?',
            options: [
                { id: 4, text: 'Terça-feira', votes: 20 },
                { id: 5, text: 'Quinta-feira', votes: 18 },
                { id: 6, text: 'Sexta-feira', votes: 9 },
            ],
            createdBy: 'Pr. João',
            createdAt: '05/07/2024',
            totalVotes: 47,
            voted: true,
        },
    ]
};