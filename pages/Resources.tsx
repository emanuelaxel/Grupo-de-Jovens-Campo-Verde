
import React, { useState } from 'react';
import Card from '../components/Card';
import { Resource } from '../types';
import { DownloadIcon, PlayIcon, FileTextIcon, LinkIcon } from '../components/Icons';

interface ResourcesProps {
  resources: Resource[];
}

const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  const [activeTab, setActiveTab] = useState('files');
  
  const renderActionButton = (resource: Resource) => {
    switch(resource.action) {
      case 'Download':
        return <><DownloadIcon /> {resource.action}</>;
      case 'Assistir':
      case 'Ouvir':
        return <><PlayIcon /> {resource.action}</>;
      default:
        return <><DownloadIcon /> Download</>;
    }
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-gray-800">Recursos</h1>
          <p className="text-brand-gray-600 mt-1">Materiais, documentos e links úteis para o grupo</p>
        </div>
        <button className="mt-4 md:mt-0 bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center gap-2">
          <span className="text-xl">+</span> Adicionar Recurso
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 bg-brand-gray-200 p-1 rounded-lg">
          <button onClick={() => setActiveTab('files')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'files' ? 'bg-white shadow-sm' : 'text-brand-gray-600'}`}>
            <span className="flex items-center gap-2"><FileTextIcon /> Arquivos e Materiais</span>
          </button>
          <button onClick={() => setActiveTab('links')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'links' ? 'bg-white shadow-sm' : 'text-brand-gray-600'}`}>
            <span className="flex items-center gap-2"><LinkIcon /> Links Úteis</span>
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
        {resources
          .filter(r => activeTab === 'files' ? r.type !== 'link' : r.type === 'link')
          .map((resource) => (
            <Card key={resource.id} className="flex items-start gap-5">
              <div className="bg-brand-gray-100 p-4 rounded-lg">{resource.icon}</div>
              <div className="flex-grow">
                <h2 className="text-lg font-bold text-brand-gray-900">{resource.title}</h2>
                <p className="text-brand-gray-600 mt-1 mb-3">{resource.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-gray-200 text-brand-gray-700">{resource.category}</span>
                  {resource.details && <p className="text-xs text-brand-gray-500">{resource.details}</p>}
                </div>
                <button className="w-full sm:w-auto bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center justify-center gap-2">
                  {renderActionButton(resource)}
                </button>
              </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default Resources;
