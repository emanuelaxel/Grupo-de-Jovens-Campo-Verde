import React from 'react';

export type Page = 'Dashboard' | 'Eventos' | 'Estudos' | 'Membros' | 'Recursos' | 'Finanças' | 'Permissões' | 'Enquetes';

export type Role = 'Líder' | 'Pastor' | 'Regente' | 'Tesoureiro' | 'Membro';

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    location: string;
    category: string;
    categoryColor: string;
    month: string; // e.g., 'JAN'
    day: string; // e.g., '28'
    maxAttendees: number;
    confirmedAttendees: number;
    attendees?: string; // Used in dashboard, e.g., "35 confirmados"
    bannerUrl?: string;
}

export interface Answer {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    text: string;
    answers: Answer[];
}

export interface Lesson {
    id: number;
    title: string;
    questions: Question[];
}

export interface Comment {
    id: number;
    authorName: string;
    authorInitials: string;
    authorAvatarColor: string;
    text: string;
    timestamp: string;
}

export interface Study {
    id: number;
    title: string;
    description: string;
    theme: string;
    scripture: string;
    leader: string;
    schedule: string;
    progress: number;
    lessons: Lesson[];
    materialUrl?: string;
    comments?: Comment[];
}

export interface Member {
    id: number;
    name: string;
    initials: string;
    avatarColor: string;
    role: Role;
    email: string;
    phone: string;
    joinDate: string;
    eventsAttended: number;
    studiesCompleted: number;
}

export interface Resource {
    id: number;
    title: string;
    description: string;
    category: string;
    type: 'file' | 'video' | 'audio' | 'link';
    icon: React.ReactNode;
    action: 'Download' | 'Assistir' | 'Ouvir' | 'Acessar';
    details?: string;
    url: string;
}

export interface FinanceStat {
    label: string;
    value: string;
    icon: React.ReactNode;
    progress?: number;
    change?: string;
}

export interface BarChartData {
    month: string;
    income: number;
    expense: number;
}

export interface ChartCategory {
    name: string;
    percentage: number;
    value: number;
    color: string;
}

export interface Transaction {
    id: number;
    description: string;
    category: string;
    amount: string;
    date: string;
    type: 'income' | 'expense';
}

export interface FinanceData {
    stats: FinanceStat[];
    incomeVsExpense: BarChartData[];
    incomeByCategory: ChartCategory[];
    expenseByCategory: ChartCategory[];
    recentTransactions: Transaction[];
}

export interface MemberStat {
    label: string;
    value: string;
    icon: React.ReactNode;
    iconBgColor: string;
    iconTextColor: string;
}

export interface MemberPageData {
    stats: MemberStat[];
    members: Member[];
}

export interface PendingMember {
    id: number;
    name: string;
    email: string;
    requestDate: string;
}

export interface DashboardStat {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

export interface DashboardData {
    stats: DashboardStat[];
    upcomingEvents: Event[];
    ongoingStudies: Study[];
    pendingApprovals: PendingMember[];
}

export interface Permission {
    name: string;
    leader: boolean;
    pastor: boolean;
    regente: boolean;
    treasurer: boolean;
    member: boolean;
}

export interface PermissionCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
    permissions: Permission[];
}

export interface IndividualPermissionMember {
    id: number;
    name: string;
    initials: string;
    role: Role;
    avatarColor: string;
    extraPermissions: string[];
}

export interface CurrentUserPermissions {
    role: Role;
    description: string;
    activePermissions: string[];
}

export interface PermissionsPageData {
    roles: {
        id: Role;
        name: string;
        description: string;
        icon: React.ReactNode;
    }[];
    permissionCategories: PermissionCategory[];
    individualPermissionMembers: IndividualPermissionMember[];
    currentUser: CurrentUserPermissions;
}

export interface PollOption {
    id: number;
    text: string;
    votes: number;
}

export interface Poll {
    id: number;
    question: string;
    options: PollOption[];
    createdBy: string;
    createdAt: string;
    totalVotes: number;
    voted: boolean;
}

export interface AppData {
    dashboard: DashboardData;
    events: Event[];
    studies: Study[];
    membersPage: MemberPageData;
    resources: Resource[];
    finances: FinanceData;
    permissionsPage: PermissionsPageData;
    polls: Poll[];
}
