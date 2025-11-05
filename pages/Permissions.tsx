import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { PermissionsPageData, Role, PermissionCategory, IndividualPermissionMember, Permission } from '../types';
import { CheckIcon, XIcon, ShieldIcon, PencilIcon } from '../components/Icons';
import { supabase } from '../supabaseClient';


const roleColors: { [key in Role]: { tag: string; } } = {
  'Líder': { tag: 'bg-purple-100 text-purple-700' },
  'Pastor': { tag: 'bg-red-100 text-red-700' },
  'Regente': { tag: 'bg-pink-100 text-pink-700' },
  'Tesoureiro': { tag: 'bg-blue-100 text-blue-700' },
  'Membro': { tag: 'bg-gray-100 text-gray-700' },
};

const PermissionTable: React.FC<{ category: PermissionCategory }> = ({ category }) => (
    <Card>
        <div className="flex items-center gap-3 mb-4">
            {category.icon}
            <h3 className="text-lg font-bold text-brand-gray-800">{category.name}</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-brand-gray-200">
                        <th className="text-left font-semibold text-brand-gray-600 pb-2">Permissão</th>
                        <th className="text-center font-semibold text-brand-gray-600 pb-2 w-24">Líder</th>
                        <th className="text-center font-semibold text-brand-gray-600 pb-2 w-24">Pastor</th>
                        <th className="text-center font-semibold text-brand-gray-600 pb-2 w-24">Regente</th>
                        <th className="text-center font-semibold text-brand-gray-600 pb-2 w-24">Tesoureiro</th>
                        <th className="text-center font-semibold text-brand-gray-600 pb-2 w-24">Membro</th>
                    </tr>
                </thead>
                <tbody>
                    {category.permissions.map((perm) => (
                        <tr key={perm.name} className="border-b border-brand-gray-200 last:border-b-0">
                            <td className="py-3 text-brand-gray-700">{perm.name}</td>
                            <td className="text-center py-3">{perm.leader ? <CheckIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XIcon className="w-4 h-4 text-brand-gray-400 mx-auto" />}</td>
                            <td className="text-center py-3">{perm.pastor ? <CheckIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XIcon className="w-4 h-4 text-brand-gray-400 mx-auto" />}</td>
                            <td className="text-center py-3">{perm.regente ? <CheckIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XIcon className="w-4 h-4 text-brand-gray-400 mx-auto" />}</td>
                            <td className="text-center py-3">{perm.treasurer ? <CheckIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XIcon className="w-4 h-4 text-brand-gray-400 mx-auto" />}</td>
                            <td className="text-center py-3">{perm.member ? <CheckIcon className="w-5 h-5 text-green-500 mx-auto" /> : <XIcon className="w-4 h-4 text-brand-gray-400 mx-auto" />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

interface PermissionModalProps {
    member: IndividualPermissionMember;
    permissionCategories: PermissionCategory[];
    onClose: () => void;
    onSave: (memberId: string, extraPermissions: string[]) => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ member, permissionCategories, onClose, onSave }) => {
    const [toggledPermissions, setToggledPermissions] = useState<string[]>(member.extraPermissions || []);

    const basePermissions = useMemo(() => {
        const roleKey = member.role.toLowerCase() as keyof Omit<Permission, 'name'>;
        const perms = new Set<string>();
        permissionCategories.forEach(category => {
            category.permissions.forEach(permission => {
                if (permission[roleKey]) {
                    perms.add(permission.name);
                }
            });
        });
        return perms;
    }, [member.role, permissionCategories]);

    const handleToggle = (permissionName: string) => {
        setToggledPermissions(prev =>
            prev.includes(permissionName)
                ? prev.filter(p => p !== permissionName)
                : [...prev, permissionName]
        );
    };

    const handleSave = () => {
        onSave(member.id, toggledPermissions);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-gray-200">
                    <h2 className="text-xl font-bold text-brand-gray-900">Gerenciar Permissões de {member.name}</h2>
                    <p className="text-sm text-brand-gray-600">Conceda ou revogue permissões extras para este usuário.</p>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    {permissionCategories.map(category => (
                        <div key={category.id}>
                            <h3 className="font-semibold text-brand-gray-800 mb-2">{category.name}</h3>
                            <div className="space-y-2">
                                {category.permissions.map(permission => {
                                    const isBasePermission = basePermissions.has(permission.name);
                                    const isChecked = isBasePermission || toggledPermissions.includes(permission.name);
                                    
                                    return (
                                        <label key={permission.name} className={`flex items-center p-3 rounded-lg border ${isBasePermission ? 'bg-brand-gray-100 text-brand-gray-500' : 'cursor-pointer hover:bg-brand-gray-50'}`}>
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                disabled={isBasePermission}
                                                onChange={() => handleToggle(permission.name)}
                                                className="h-4 w-4 rounded border-gray-300 text-brand-purple focus:ring-brand-purple disabled:opacity-50"
                                            />
                                            <span className="ml-3 text-sm">{permission.name}</span>
                                            {isBasePermission && <span className="ml-auto text-xs font-medium text-brand-gray-400">(Padrão da Função)</span>}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 border-t border-brand-gray-200 flex justify-end gap-3">
                    <button onClick={onClose} className="bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors">Cancelar</button>
                    <button onClick={handleSave} className="bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors">Salvar Alterações</button>
                </div>
            </div>
        </div>
    );
};


const Permissions: React.FC<{ data: PermissionsPageData; currentUserRole: Role }> = ({ data, currentUserRole }) => {
    const [selectedRole, setSelectedRole] = useState<Role>('Líder');
    const [members, setMembers] = useState<IndividualPermissionMember[]>([]);
    const [modalState, setModalState] = useState<{isOpen: boolean; member: IndividualPermissionMember | null}>({isOpen: false, member: null});
    
    const canManage = ['Líder', 'Pastor'].includes(currentUserRole);

    const fetchMembers = useCallback(async () => {
        const { data, error } = await supabase.from('members').select('id, name, initials, role, avatarColor, extraPermissions');
        if (error) {
            console.error("Error fetching members for permissions:", error);
        } else {
            setMembers(data as IndividualPermissionMember[]);
        }
    }, []);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);


    const handleOpenModal = (member: IndividualPermissionMember) => {
        if (canManage) {
            setModalState({ isOpen: true, member });
        }
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, member: null });
    };

    const handleSavePermissions = async (memberId: string, extraPermissions: string[]) => {
        const { error } = await supabase.from('members').update({ extraPermissions }).eq('id', memberId);
        if (error) {
            console.error("Error saving permissions:", error);
        } else {
            fetchMembers();
        }
        handleCloseModal();
    };
    
    return (
        <div className="space-y-8">
            {modalState.isOpen && modalState.member && (
                <PermissionModal
                    member={modalState.member}
                    permissionCategories={data.permissionCategories}
                    onClose={handleCloseModal}
                    onSave={handleSavePermissions}
                />
            )}
            <div>
                <h1 className="text-3xl font-bold text-brand-gray-900">Gerenciamento de Permissões</h1>
                <p className="text-brand-gray-600 mt-1">Controle de acesso e permissões por função</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {data.roles.map(role => (
                    <button key={role.id} onClick={() => setSelectedRole(role.id)} className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${selectedRole === role.id ? 'bg-white border-brand-purple shadow-lg' : 'bg-white/70 border-brand-gray-200 hover:border-brand-purple/50'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedRole === role.id ? 'bg-purple-100': 'bg-brand-gray-100'}`}>
                                {role.icon}
                            </div>
                            <h2 className="font-bold text-lg text-brand-gray-800">{role.name}</h2>
                        </div>
                        <p className="text-sm text-brand-gray-600 mt-3">{role.description}</p>
                    </button>
                ))}
            </div>

            <Card>
                <h3 className="text-lg font-bold text-brand-gray-800">Gerenciar Permissões Individuais</h3>
                <p className="text-sm text-brand-gray-500 mt-1">Conceda permissões extras a membros específicos sem alterar sua função</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map(member => {
                        const extraPermissionsCount = member.extraPermissions?.length || 0;
                        return (
                            <div key={member.id} className="bg-brand-gray-100 p-3 rounded-lg flex items-start justify-between gap-3 border border-brand-gray-200/80">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${member.avatarColor}`}>
                                        {member.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-brand-gray-800">{member.name}</p>
                                        <p className={`text-xs font-medium ${roleColors[member.role].tag} px-2 py-0.5 rounded-full inline-block`}>{member.role}</p>
                                        {extraPermissionsCount > 0 && <p className="text-xs text-brand-purple font-semibold mt-1">+{extraPermissionsCount} permissão(ões) extra</p>}
                                    </div>
                                </div>
                                {canManage && (
                                    <button onClick={() => handleOpenModal(member)} className="flex-shrink-0 bg-white text-xs font-semibold text-brand-gray-700 px-3 py-1.5 rounded-md border border-brand-gray-300 hover:bg-brand-gray-200 transition-colors flex items-center gap-1.5">
                                        <PencilIcon className="w-3 h-3"/> Gerenciar
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Card>

            <div className="space-y-6">
                {data.permissionCategories.map(cat => <PermissionTable key={cat.id} category={cat} />)}
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-blue-100 rounded-lg">
                        <ShieldIcon className="w-6 h-6 text-blue-600"/>
                    </div>
                    <h3 className="text-lg font-bold text-blue-900">Seu Nível de Acesso Atual</h3>
                </div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-brand-gray-700">Função:</span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${roleColors[currentUserRole].tag}`}>
                        {currentUserRole}
                    </span>
                </div>
                <p className="text-sm text-blue-800/80 mb-4">{data.currentUser.description}</p>
                
                <h4 className="font-semibold text-brand-gray-700 mb-2">Suas permissões ativas:</h4>
                <div className="flex flex-wrap gap-2">
                    {data.currentUser.activePermissions.map(perm => (
                        <span key={perm} className="bg-white text-sm text-brand-gray-700 font-medium px-3 py-1 rounded-md border border-brand-gray-300">
                            {perm}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Permissions;