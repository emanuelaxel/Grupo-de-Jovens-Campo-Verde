import React, { useState } from 'react';
import { Poll, PollOption } from '../types';
import { PlusIcon, TrashIcon } from './Icons';

interface PollModalProps {
    onClose: () => void;
    onSave: (pollData: Omit<Poll, 'id' | 'votes' | 'voted' | 'totalVotes' | 'options'> & { options: { text: string }[] }) => void;
}

const PollModal: React.FC<PollModalProps> = ({ onClose, onSave }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '' }, { text: '' }]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index].text = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, { text: '' }]);
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pollData = {
            question,
            options: options.map(opt => ({...opt, id: 0, votes: 0})), // add dummy data to match type
            createdBy: 'Ana Silva', // In a real app, this would be the current user
            createdAt: new Date().toLocaleDateString('pt-BR'),
        };
        onSave(pollData);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-gray-200">
                    <h2 className="text-xl font-bold text-brand-gray-900">Criar Nova Enquete</h2>
                    <p className="text-sm text-brand-gray-600">Faça uma pergunta para o grupo.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div>
                        <label htmlFor="question" className="block text-sm font-medium text-brand-gray-700 mb-1">Pergunta</label>
                        <textarea id="question" value={question} onChange={e => setQuestion(e.target.value)} required rows={3} className="input-field"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-gray-700 mb-1">Opções de Resposta</label>
                        <div className="space-y-2">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input 
                                        type="text" 
                                        placeholder={`Opção ${index + 1}`}
                                        value={option.text}
                                        onChange={e => handleOptionChange(index, e.target.value)}
                                        required
                                        className="input-field flex-1"
                                    />
                                    {options.length > 2 && (
                                        <button type="button" onClick={() => handleRemoveOption(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-full">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                         <button type="button" onClick={handleAddOption} className="mt-2 text-sm font-semibold text-brand-purple hover:underline flex items-center gap-1">
                            <PlusIcon className="w-4 h-4" /> Adicionar Opção
                        </button>
                    </div>
                </form>
                <div className="p-6 border-t border-brand-gray-200 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors">Cancelar</button>
                    <button type="submit" onClick={handleSubmit} className="bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors">Publicar Enquete</button>
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
                  border-radius: 0.5rem;
                }
                .input-field:focus {
                  outline: none;
                  --tw-ring-color: #F3F4FB;
                  box-shadow: 0 0 0 2px var(--tw-ring-color);
                  border-color: #6D28D9;
                  z-index: 10;
                }
            `}</style>
        </div>
    );
};

export default PollModal;
