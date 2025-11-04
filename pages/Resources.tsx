import React, { useState } from 'react';
import Card from '../components/Card';
import { Resource, Role } from '../types';
import { DownloadIcon, PlayIcon, FileTextIcon, LinkIcon, PlusIcon, ImageIcon, MusicNoteIcon } from '../components/Icons';
import ResourceModal from '../components/ResourceModal';

interface ResourcesProps {
  initialResources: Resource[];
  currentUserRole: Role;
}

const Resources: React.FC<ResourcesProps> = ({ initialResources, currentUserRole }) => {
  const [resources, setResources] = useState(initialResources);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('media');

  const canManageResources = ['Líder', 'Pastor', 'Regente', 'Tesoureiro'].includes(currentUserRole);

  const handleAddResources = (newResources: Omit<Resource, 'id'>[]) => {
      const fullNewResources = newResources.map(res => ({
        ...res,
        id: Date.now() + Math.random(),
      }));
      setResources(prev => [...fullNewResources, ...prev]);
      setIsModalOpen(false);
  };
  
  const renderActionButton = (resource: Resource) => {
    switch(resource.action) {
      case 'Download':
        return <><DownloadIcon className="w-4 h-4" /> {resource.action}</>;
      case 'Assistir':
      case 'Ouvir':
        return <><PlayIcon className="w-4 h-4" /> {resource.action}</>;
      case 'Ver':
         return <a href={resource.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center justify-center gap-2"><ImageIcon className="w-4 h-4" /> {resource.action}</a>;
      case 'Acessar':
         return <a href={resource.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center justify-center gap-2"><LinkIcon className="w-4 h-4" /> {resource.action}</a>;
      default:
        return <a href={resource.url} download target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center justify-center gap-2"><DownloadIcon className="w-4 h-4" /> Download</a>;
    }
  }

  const tabContent: { [key: string]: string[] } = {
    media: ['gallery', 'video', 'audio', 'playlist'],
    files: ['file'],
    links: ['link']
  };

  const filteredResources = resources.filter(r => tabContent[activeTab]?.includes(r.type));
  
  return (
    <div>
      {isModalOpen && <ResourceModal onClose={() => setIsModalOpen(false)} onSave={handleAddResources} />}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-gray-800">Recursos</h1>
          <p className="text-brand-gray-600 mt-1">Materiais, documentos e links úteis para o grupo</p>
        </div>
        {canManageResources &&
            <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 md:mt-0 bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center gap-2">
            <PlusIcon className="w-5 h-5" /> Adicionar Recurso
            </button>
        }
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 bg-brand-gray-200 p-1 rounded-lg">
          <button onClick={() => setActiveTab('media')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'media' ? 'bg-white shadow-sm' : 'text-brand-gray-600'}`}>
            <span className="flex items-center gap-2"><PlayIcon className="w-4 h-4" /> Mídia</span>
          </button>
          <button onClick={() => setActiveTab('files')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'files' ? 'bg-white shadow-sm' : 'text-brand-gray-600'}`}>
            <span className="flex items-center gap-2"><FileTextIcon className="w-4 h-4"/> Arquivos</span>
          </button>
          <button onClick={() => setActiveTab('links')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'links' ? 'bg-white shadow-sm' : 'text-brand-gray-600'}`}>
            <span className="flex items-center gap-2"><LinkIcon className="w-4 h-4"/> Links Úteis</span>
          </button>
        </div>

        <div className="w-full sm:w-auto flex gap-4">
          <div className="flex-grow bg-white rounded-lg p-2 flex items-center border border-brand-gray-200/80">
            <svg className="w-5 h-5 text-gray-400 mr-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Buscar recursos..." className="w-full bg-transparent focus:outline-none text-brand-gray-700"/>
          </div>
          <select className="bg-white border border-brand-gray-200/80 rounded-lg px-3 py-2.5 text-sm text-brand-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple">
            <option>Todas Categorias</option>
            <option>Estudos</option>
            <option>Louvor</option>
            <option>Mensagens</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <Card key={resource.id} className="flex items-start gap-5">
              <div className="bg-brand-gray-100 p-4 rounded-lg">{resource.icon}</div>
              <div className="flex-grow">
                <h2 className="text-lg font-bold text-brand-gray-900">{resource.title}</h2>
                <p className="text-brand-gray-600 mt-1 mb-3">{resource.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-gray-200 text-brand-gray-700">{resource.category}</span>
                  {resource.details && <p className="text-xs text-brand-gray-500">{resource.details}</p>}
                </div>
                {renderActionButton(resource)}
              </div>
            </Card>
          ))
        ) : (
          <div className="md:col-span-2 text-center py-12 text-brand-gray-500 bg-white rounded-2xl border border-brand-gray-200/50">
            <p className="text-lg font-semibold">Nenhum recurso encontrado.</p>
            <p className="mt-1">Tente selecionar outra aba ou adicione um novo recurso.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;