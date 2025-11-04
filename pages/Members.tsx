import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Member, MemberPageData, Role } from '../types';
import { UsersIcon, SearchIcon, ChevronDownIcon, PlusIcon, MailIcon, PhoneIcon, CalendarIcon, BookOpenIcon, ShieldIcon, PencilIcon } from '../components/Icons';
import AddMemberModal from '../components/AddMemberModal';
import EditMemberModal from '../components/EditMemberModal';

const roleColors: { [key: string]: string } = {
  'Líder': 'bg-purple-100 text-purple-700',
  'Pastor': 'bg-red-100 text-red-700',
  'Regente': 'bg-pink-100 text-pink-700',
  'Tesoureiro': 'bg-blue-100 text-blue-700',
  'Membro': 'bg-gray-100 text-gray-700',
};

interface MemberCardProps {
  member: Member;
  canViewPersonalData: boolean;
  canManageMembers: boolean;
  onRoleChange: (memberId: number, newRole: Role) => void;
  onEdit: (member: Member) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, canViewPersonalData, canManageMembers, onRoleChange, onEdit }) => (
  <Card className="p-5 flex flex-col">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${member.avatarColor}`}>
          {member.initials}
        </div>
        <div>
          <h3 className="font-bold text-lg text-brand-gray-800">{member.name}</h3>
        </div>
      </div>
       <div className="flex items-center gap-2">
            {canManageMembers && (
                <button onClick={() => onEdit(member)} className="p-2 text-brand-gray-500 hover:bg-brand-gray-100 rounded-full">
                    <PencilIcon className="w-4 h-4" />
                </button>
            )}
           {canManageMembers ? (
              <select
                  value={member.role}
                  onChange={(e) => onRoleChange(member.id, e.target.value as Role)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border-2 border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple transition-all ${roleColors[member.role]}`}
              >
                  <option value="Líder">Líder</option>
                  <option value="Pastor">Pastor</option>
                  <option value="Regente">Regente</option>
                  <option value="Tesoureiro">Tesoureiro</option>
                  <option value="Membro">Membro</option>
              </select>
          ) : (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${roleColors[member.role]}`}>
              {member.role}
            </span>
          )}
       </div>
    </div>

    <div className="my-5 space-y-2 text-sm text-brand-gray-600">
      <div className="flex items-center gap-3">
        <MailIcon className="w-4 h-4 text-brand-gray-400" />
        <span>{canViewPersonalData ? member.email : 'Dados pessoais ocultos'}</span>
      </div>
      <div className="flex items-center gap-3">
        <PhoneIcon className="w-4 h-4 text-brand-gray-400" />
        <span>{canViewPersonalData ? member.phone : 'Dados pessoais ocultos'}</span>
      </div>
      <div className="flex items-center gap-3">
        <CalendarIcon className="w-4 h-4 text-brand-gray-400" />
        <span>Membro desde {member.joinDate}</span>
      </div>
    </div>

    <div className="mt-auto pt-4 border-t border-brand-gray-200 flex items-center gap-6 text-sm text-brand-gray-700">
       <div className="flex items-center gap-2">
        <UsersIcon className="w-4 h-4 text-brand-gray-500"/>
        <span className="font-medium">{member.eventsAttended}</span>
        <span className="text-brand-gray-500">eventos</span>
      </div>
      <div className="flex items-center gap-2">
        <BookOpenIcon className="w-4 h-4 text-brand-gray-500"/>
        <span className="font-medium">{member.studiesCompleted}</span>
        <span className="text-brand-gray-500">estudos</span>
      </div>
    </div>
  </Card>
);

interface MembersPageProps {
  data: MemberPageData;
  currentUserRole: Role;
}

const Members: React.FC<MembersPageProps> = ({ data, currentUserRole }) => {
  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem('appMembers');
    try {
        if (savedMembers) {
            return JSON.parse(savedMembers);
        }
    } catch (error) {
        console.error("Failed to parse members from localStorage", error);
    }
    return data.members;
  });

  useEffect(() => {
    localStorage.setItem('appMembers', JSON.stringify(members));
  }, [members]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const canViewPersonalData = ['Líder', 'Pastor', 'Regente', 'Tesoureiro'].includes(currentUserRole);
  const canManageMembers = ['Líder', 'Pastor', 'Regente', 'Tesoureiro'].includes(currentUserRole);

    const handleOpenEditModal = (member: Member) => {
        setEditingMember(member);
        setIsEditModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setEditingMember(null);
    };


  const handleRoleChange = (memberId: number, newRole: Role) => {
    setMembers(currentMembers =>
        currentMembers.map(m =>
            m.id === memberId ? { ...m, role: newRole } : m
        )
    );
  };

  const handleAddMember = (memberData: any) => {
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`;
        }
        return name.substring(0, 2);
    };

    const avatarColors = [
        'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 
        'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newMember: Member = {
        id: Date.now(),
        name: memberData.name,
        initials: getInitials(memberData.name).toUpperCase(),
        avatarColor: randomColor,
        role: memberData.role,
        email: memberData.email,
        phone: memberData.phone,
        joinDate: new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }),
        eventsAttended: 0,
        studiesCompleted: 0,
        dob: memberData.dob,
        address: memberData.address,
        baptismDate: memberData.baptismDate,
    };

    setMembers(prevMembers => [newMember, ...prevMembers]);

    // Save user credentials for login
    const storedUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
    const newUserCredentials = {
        email: memberData.email,
        password: memberData.password,
        role: memberData.role
    };
    storedUsers.push(newUserCredentials);
    localStorage.setItem('appUsers', JSON.stringify(storedUsers));
    
    handleCloseModals();
  };
  
    const handleUpdateMember = (updatedData: any) => {
        if (!editingMember) return;

        setMembers(prevMembers =>
            prevMembers.map(m => (m.id === editingMember.id ? { ...m, ...updatedData } : m))
        );

        // Update user credentials in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
        const userIndex = storedUsers.findIndex((user: any) => user.email === editingMember.email);
        
        if (userIndex !== -1) {
            storedUsers[userIndex].email = updatedData.email;
            storedUsers[userIndex].role = updatedData.role;
            // Only update password if a new one was provided
            if (updatedData.password) {
                storedUsers[userIndex].password = updatedData.password;
            }
            localStorage.setItem('appUsers', JSON.stringify(storedUsers));
        }

        handleCloseModals();
    };


  return (
    <div className="space-y-6">
      {isAddModalOpen && <AddMemberModal onClose={handleCloseModals} onSave={handleAddMember} />}
      {isEditModalOpen && editingMember && (
          <EditMemberModal 
              member={editingMember}
              onClose={handleCloseModals}
              onSave={handleUpdateMember}
            />
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-brand-gray-900">Membros do Grupo</h1>
          <p className="text-brand-gray-600 mt-1">Gerencie os membros e suas informações</p>
        </div>
        <button 
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 md:mt-0 bg-brand-gray-900 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center gap-2">
          <PlusIcon className="w-5 h-5" /> Adicionar Membro
        </button>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 flex items-start sm:items-center gap-3 text-sm">
        <ShieldIcon className="w-6 h-6 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <span>Apenas usuários com a função 'Líder' podem visualizar informações de contato como e-mail e telefone dos membros.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.stats.map((stat, index) => (
          <Card key={index} className="flex items-center p-5">
            <div className={`p-4 rounded-lg mr-4 ${stat.iconBgColor}`}>
                <span className={stat.iconTextColor}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm text-brand-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-brand-gray-800">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-3 rounded-xl border border-brand-gray-200/50">
          <div className="relative w-full sm:w-auto flex-grow sm:max-w-xs">
            <SearchIcon className="w-5 h-5 text-brand-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar membros..." className="w-full bg-brand-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple-light text-brand-gray-700 placeholder-brand-gray-500" />
          </div>
          <div className="relative w-full sm:w-auto">
              <select className="w-full appearance-none bg-transparent pr-8 py-2.5 text-sm font-medium text-brand-gray-700 focus:outline-none cursor-pointer">
                  <option>Todas as Funções</option>
                  <option>Líder</option>
                  <option>Pastor</option>
                  <option>Regente</option>
                  <option>Tesoureiro</option>
                  <option>Membro</option>
              </select>
              <ChevronDownIcon className="w-4 h-4 text-brand-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => (
          <MemberCard key={member.id} member={member} canViewPersonalData={canViewPersonalData} canManageMembers={canManageMembers} onRoleChange={handleRoleChange} onEdit={handleOpenEditModal} />
        ))}
      </div>

    </div>
  );
};

export default Members;