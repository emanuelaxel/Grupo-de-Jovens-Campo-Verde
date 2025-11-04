import React, { useState, useEffect } from 'react';
import { Role, Member } from '../types';

interface EditMemberModalProps {
    onClose: () => void;
    onSave: (memberData: any) => void;
    member: Member;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ onClose, onSave, member }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Leave blank to not change
    const [role, setRole] = useState<Role>('Membro');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [baptismDate, setBaptismDate] = useState('');

    useEffect(() => {
        if (member) {
            setName(member.name);
            setEmail(member.email);
            setRole(member.role);
            setPhone(member.phone);
            setDob(member.dob || '');
            setAddress(member.address || '');
            setBaptismDate(member.baptismDate || '');
        }
    }, [member]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData: any = {
            name, email, role, phone, dob, address, baptismDate
        };
        if (password) {
            updatedData.password = password;
        }
        onSave(updatedData);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-gray-200">
                    <h2 className="text-xl font-bold text-brand-gray-900">Editar Membro</h2>
                    <p className="text-sm text-brand-gray-600">Atualize os detalhes do membro.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Nome completo" required className="input-field" type="text" value={name} onChange={e => setName(e.target.value)} />
                        <input placeholder="E-mail" required className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input placeholder="Nova Senha (deixe em branco para manter)" className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <select value={role} onChange={e => setRole(e.target.value as Role)} required className="input-field">
                            <option value="Membro">Membro</option>
                            <option value="Líder">Líder</option>
                            <option value="Pastor">Pastor</option>
                            <option value="Regente">Regente</option>
                            <option value="Tesoureiro">Tesoureiro</option>
                        </select>
                        <input placeholder="Data de Nascimento" required className="input-field" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} value={dob} onChange={e => setDob(e.target.value)} />
                        <input placeholder="Telefone" required className="input-field" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                        <input placeholder="Endereço" required className="input-field md:col-span-2" type="text" value={address} onChange={e => setAddress(e.target.value)} />
                        <input placeholder="Data de Batismo (opcional)" className="input-field md:col-span-2" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} value={baptismDate} onChange={e => setBaptismDate(e.target.value)} />
                    </div>
                </form>
                <div className="p-6 border-t border-brand-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                    <button type="button" onClick={onClose} className="bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors">Cancelar</button>
                    <button type="submit" onClick={handleSubmit} className="bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors">Salvar Alterações</button>
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

export default EditMemberModal;