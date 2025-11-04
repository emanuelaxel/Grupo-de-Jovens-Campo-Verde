import React, { useState, useMemo } from 'react';
import { Resource, ResourceType } from '../types';
import { 
    ImageIcon, MusicNoteIcon, PlayIcon, FileTextIcon, LinkIcon, UploadIcon, TrashIcon 
} from './Icons';

interface ResourceModalProps {
    onClose: () => void;
    onSave: (resources: Omit<Resource, 'id'>[]) => void;
}

const resourceTypesConfig = {
    gallery: { title: 'Galeria de Fotos', icon: <ImageIcon className="w-8 h-8 text-indigo-500" />, multiFile: true, fileType: 'image/*' },
    playlist: { title: 'Playlist de Música', icon: <MusicNoteIcon className="w-8 h-8 text-pink-500" /> },
    audio: { title: 'Arquivo de Áudio', icon: <PlayIcon className="w-8 h-8 text-teal-500" />, multiFile: false, fileType: 'audio/*' },
    file: { title: 'Documento', icon: <FileTextIcon className="w-8 h-8 text-blue-500" />, multiFile: false, fileType: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx' },
    link: { title: 'Link Útil', icon: <LinkIcon className="w-8 h-8 text-orange-500" /> },
};

const ResourceModal: React.FC<ResourceModalProps> = ({ onClose, onSave }) => {
    const [step, setStep] = useState(1);
    const [type, setType] = useState<ResourceType | null>(null);

    // Form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);

    const config = useMemo(() => type ? resourceTypesConfig[type as keyof typeof resourceTypesConfig] : null, [type]);

    const handleTypeSelect = (selectedType: ResourceType) => {
        setType(selectedType);
        setStep(2);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!type || !config) return;

        let newResources: Omit<Resource, 'id'>[] = [];

        if (files && files.length > 0) {
            // FIX: Explicitly type `file` as `File` to resolve type errors. `FileList` contains `File` objects,
            // which have `name` and `size` properties and can be used with `URL.createObjectURL`.
            Array.from(files).forEach((file: File) => {
                newResources.push({
                    title: files.length > 1 ? `${title} (${file.name})` : title,
                    description,
                    category,
                    type,
                    url: URL.createObjectURL(file),
                    icon: config.icon,
                    action: type === 'gallery' ? 'Ver' : type === 'audio' ? 'Ouvir' : 'Download',
                    details: `${(file.size / 1024).toFixed(2)} KB`
                });
            });
        } else {
            newResources.push({
                title,
                description,
                category,
                type,
                url,
                icon: config.icon,
                action: 'Acessar',
                details: url
            });
        }
        
        onSave(newResources);
    };

    const renderStep1 = () => (
        <>
            <div className="p-6 border-b border-brand-gray-200 text-center">
                <h2 className="text-xl font-bold text-brand-gray-900">Adicionar Novo Recurso</h2>
                <p className="text-sm text-brand-gray-600">Selecione o tipo de recurso que deseja criar.</p>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(resourceTypesConfig).map(([key, value]) => (
                    <button 
                        key={key} 
                        onClick={() => handleTypeSelect(key as ResourceType)}
                        className="p-4 border border-brand-gray-200 rounded-lg flex flex-col items-center justify-center text-center hover:bg-brand-purple-light/30 hover:border-brand-purple transition-colors"
                    >
                        {value.icon}
                        <span className="mt-2 text-sm font-semibold text-brand-gray-700">{value.title}</span>
                    </button>
                ))}
            </div>
        </>
    );
    
    const renderStep2 = () => (
        <>
            <div className="p-6 border-b border-brand-gray-200">
                <h2 className="text-xl font-bold text-brand-gray-900">Adicionar {config?.title}</h2>
                <p className="text-sm text-brand-gray-600">Preencha os detalhes abaixo.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                    <label className="label">Título</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="input-field" />
                </div>
                <div>
                    <label className="label">Descrição</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="input-field"></textarea>
                </div>
                 <div>
                    <label className="label">Categoria</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} required className="input-field">
                        <option value="">Selecione uma categoria</option>
                        <option>Estudos</option>
                        <option>Louvor</option>
                        <option>Mensagens</option>
                        <option>Eventos</option>
                        <option>Outros</option>
                    </select>
                </div>
                
                {config?.fileType ? (
                     <div>
                        <label className="label">Arquivo(s)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-brand-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadIcon className="mx-auto h-12 w-12 text-brand-gray-400" />
                                <div className="flex text-sm text-brand-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-purple hover:text-brand-purple-dark">
                                        <span>Carregar arquivo(s)</span>
                                        <input id="file-upload" type="file" className="sr-only" multiple={config.multiFile} accept={config.fileType} onChange={handleFileChange} required />
                                    </label>
                                </div>
                                <p className="text-xs text-brand-gray-500">{files?.length ? `${files.length} arquivo(s) selecionado(s)` : 'Nenhum arquivo selecionado'}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="label">URL</label>
                        <input type="url" value={url} onChange={e => setUrl(e.target.value)} required className="input-field" placeholder="https://..." />
                    </div>
                )}
            </form>
            <div className="p-6 border-t border-brand-gray-200 flex justify-between gap-3 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setStep(1)} className="bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors">Voltar</button>
                <div className="flex gap-3">
                    <button type="button" onClick={onClose} className="bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors">Cancelar</button>
                    <button type="submit" onClick={handleSubmit} className="bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors">Salvar Recurso</button>
                </div>
            </div>
        </>
    );

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                {step === 1 ? renderStep1() : renderStep2()}
            </div>
             <style>{`
                .input-field { appearance: none; position: relative; display: block; width: 100%; padding: 0.75rem; border-width: 1px; border-color: #CED4DA; border-radius: 0.5rem; }
                .input-field:focus { outline: none; --tw-ring-color: #F3F4FB; box-shadow: 0 0 0 2px var(--tw-ring-color); border-color: #6D28D9; z-index: 10; }
                .label { display: block; font-size: 0.875rem; font-weight: 500; color: #495057; margin-bottom: 0.25rem; }
            `}</style>
        </div>
    );
};

export default ResourceModal;
