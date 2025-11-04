import React, { useState } from 'react';
import Card from './Card';
import { PendingMember } from '../types';
import { ClockIcon } from './Icons';

interface PendingApprovalsProps {
    initialApprovals: PendingMember[];
}

const PendingApprovals: React.FC<PendingApprovalsProps> = ({ initialApprovals }) => {
    const [approvals, setApprovals] = useState(initialApprovals);

    const handleDecision = (id: number) => {
        setApprovals(currentApprovals => currentApprovals.filter(a => a.id !== id));
    };
    
    if (approvals.length === 0) {
        return null; // Or a message indicating no pending approvals
    }

    return (
        <Card>
            <h2 className="text-xl font-bold text-brand-gray-800">Cadastros Pendentes</h2>
            <p className="text-brand-gray-500 mb-4">Novos membros aguardando sua aprovação para acessar o sistema.</p>
            <div className="space-y-3">
                {approvals.map(approval => (
                    <div key={approval.id} className="bg-brand-gray-100 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <p className="font-semibold text-brand-gray-800">{approval.name}</p>
                            <p className="text-sm text-brand-gray-600">{approval.email}</p>
                            <p className="text-xs text-brand-gray-500 mt-1 flex items-center gap-1"><ClockIcon className="w-3 h-3" /> {approval.requestDate}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <button onClick={() => handleDecision(approval.id)} className="px-3 py-1.5 text-xs font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">Aprovar</button>
                            <button onClick={() => handleDecision(approval.id)} className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">Negar</button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default PendingApprovals;
