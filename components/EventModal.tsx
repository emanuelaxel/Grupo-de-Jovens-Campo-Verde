import React, { useState } from 'react';
import { Event } from '../types';
import { UploadIcon } from './Icons';

interface EventModalProps {
    onClose: () => void;
    onSave: (eventData: Omit<Event, 'id' | 'day' | 'month' | 'categoryColor' | 'confirmedAttendees'>) => void;
}

const EventModal: React.FC<EventModalProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [maxAttendees, setMaxAttendees] = useState(50);
    const [description, setDescription] = useState('');
    const [bannerUrl, setBannerUrl] = useState<string | undefined>(undefined);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setBannerPreview(result);
                setBannerUrl(result); // In a real app, you'd upload and get a URL.
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, category, date, time, location, maxAttendees, description, bannerUrl });
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-gray-200">
                    <h2 className="text-xl font-bold text-brand-gray-900">Criar Novo Evento</h2>
                    <p className="text-sm text-brand-gray-600">Preencha os detalhes do novo evento.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-brand-gray-700 mb-1">Título do Evento</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="input-field" />
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-brand-gray-700 mb-1">Descrição</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="input-field"></textarea>
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-brand-gray-700 mb-1">Banner do Evento</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-brand-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {bannerPreview ? (
                                        <img src={bannerPreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md object-contain" />
                                    ) : (
                                        <UploadIcon className="mx-auto h-12 w-12 text-brand-gray-400" />
                                    )}
                                    <div className="flex text-sm text-brand-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-purple hover:text-brand-purple-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-purple">
                                            <span>Carregar um arquivo</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleBannerChange} />
                                        </label>
                                        <p className="pl-1">ou arraste e solte</p>
                                    </div>
                                    <p className="text-xs text-brand-gray-500">PNG, JPG, GIF até 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-brand-gray-700 mb-1">Categoria</label>
                            <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} required className="input-field" />
                        </div>
                        <div>
                             <label htmlFor="maxAttendees" className="block text-sm font-medium text-brand-gray-700 mb-1">Máx. de Participantes</label>
                            <input type="number" id="maxAttendees" value={maxAttendees} onChange={e => setMaxAttendees(parseInt(e.target.value, 10))} required className="input-field" />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-brand-gray-700 mb-1">Data</label>
                            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="input-field" />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-brand-gray-700 mb-1">Horário</label>
                            <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="input-field" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="location" className="block text-sm font-medium text-brand-gray-700 mb-1">Local</label>
                            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="input-field" />
                        </div>
                    </div>
                    <div className="p-6 border-t border-brand-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                        <button type="button" onClick={onClose} className="bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors">Salvar Evento</button>
                    </div>
                </form>
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

export default EventModal;
