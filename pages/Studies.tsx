import React, { useState } from 'react';
import Card from '../components/Card';
import { Study, Role, Comment } from '../types';
import { PlusIcon, BookOpenIcon, ClockIcon, UserIcon, DownloadIcon, PencilIcon, ChatBubbleLeftIcon, TrashIcon } from '../components/Icons';
import StudyModal from '../components/StudyModal';
import StudyDetailsModal from '../components/StudyDetailsModal';


interface StudiesProps {
  initialStudies: Study[];
  currentUserRole: Role;
}

const Studies: React.FC<StudiesProps> = ({ initialStudies, currentUserRole }) => {
  const [studies, setStudies] = useState(initialStudies);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  const canManageStudies = ['Líder', 'Tesoureiro', 'Pastor', 'Regente'].includes(currentUserRole);

  const handleSaveStudy = (studyData: Omit<Study, 'id' | 'progress'>) => {
    if (selectedStudy) {
      // Edit logic
      setStudies(studies.map(s => s.id === selectedStudy.id ? { ...selectedStudy, ...studyData } : s));
    } else {
      // Add new logic
      const newStudy: Study = {
        ...studyData,
        id: Date.now(),
        progress: 0,
        comments: [],
      };
      setStudies(prevStudies => [newStudy, ...prevStudies]);
    }
    setIsEditModalOpen(false);
    setSelectedStudy(null);
  };

  const handleDeleteStudy = (studyId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este estudo? Todos os dados, incluindo lições e comentários, serão perdidos permanentemente.')) {
        setStudies(prevStudies => prevStudies.filter(study => study.id !== studyId));
    }
  };

  const handleAddComment = (studyId: number, commentText: string) => {
    const email = localStorage.getItem('userEmail') || 'convidado@email.com';
    const namePart = email.split('@')[0];
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[^a-zA-Z0-9]/g, '');
    const initials = (name[0] || 'C').toUpperCase();


    const newComment: Comment = {
        id: Date.now(),
        authorName: name,
        authorInitials: initials,
        authorAvatarColor: 'bg-gradient-to-br from-purple-500 to-indigo-600',
        text: commentText,
        timestamp: 'Agora mesmo'
    };

    setStudies(currentStudies => 
        currentStudies.map(study => {
            if (study.id === studyId) {
                const updatedComments = [...(study.comments || []), newComment];
                return { ...study, comments: updatedComments };
            }
            return study;
        })
    );
    
    // Also update the selected study if it's open in the details modal
    if (selectedStudy && selectedStudy.id === studyId) {
        setSelectedStudy(prev => prev ? {...prev, comments: [...(prev.comments || []), newComment]} : null);
    }
  };


  const handleOpenAddModal = () => {
    setSelectedStudy(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (study: Study) => {
    setSelectedStudy(study);
    setIsEditModalOpen(true);
  };

  const handleShowDetails = (study: Study) => {
    setSelectedStudy(study);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedStudy(null);
  };

  return (
    <div className="space-y-6">
      {isEditModalOpen && (
        <StudyModal
          onClose={handleCloseModals}
          onSave={handleSaveStudy}
          study={selectedStudy}
        />
      )}
      {isDetailsModalOpen && selectedStudy && (
        <StudyDetailsModal
            study={selectedStudy}
            onClose={handleCloseModals}
            onAddComment={(commentText) => handleAddComment(selectedStudy.id, commentText)}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-gray-800">Estudos Bíblicos</h1>
          <p className="text-brand-gray-600 mt-1">Explore os estudos bíblicos do grupo</p>
        </div>
        {canManageStudies && (
            <button
              onClick={handleOpenAddModal}
              className="mt-4 md:mt-0 bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" /> Novo Estudo
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study) => (
          <Card key={study.id} className="flex flex-col">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">{study.theme}</span>
              <h2 className="text-lg font-bold text-brand-gray-900 mt-3">{study.title}</h2>
              <p className="text-sm text-brand-gray-600 mt-2 line-clamp-3 h-[60px]">{study.description}</p>
            </div>
            
            <div className="my-4 space-y-2 text-sm text-brand-gray-700">
                <p className="flex items-center gap-2"><BookOpenIcon className="w-4 h-4 text-brand-gray-500"/> {study.scripture}</p>
                <p className="flex items-center gap-2"><UserIcon className="w-4 h-4 text-brand-gray-500"/> Liderado por {study.leader}</p>
                <p className="flex items-center gap-2"><ClockIcon className="w-4 h-4 text-brand-gray-500"/> {study.schedule}</p>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-sm text-brand-gray-900">Progresso ({study.lessons.length} Lições)</h3>
                  <span className="text-sm font-medium text-brand-gray-600">{study.progress}%</span>
              </div>
              <div className="w-full bg-brand-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${study.progress}%` }}></div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 border-t border-brand-gray-200 pt-4">
              <div className="flex items-center gap-2 text-sm text-brand-gray-600">
                <ChatBubbleLeftIcon className="w-4 h-4" />
                <span>{study.comments?.length || 0}</span>
              </div>
              <div className="flex-grow flex items-center justify-end gap-1.5">
                  <button onClick={() => handleShowDetails(study)} className="bg-white text-brand-gray-800 font-semibold py-1.5 px-3 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors text-xs">
                      Ver Detalhes
                  </button>
                  {canManageStudies && (
                      <>
                        <button onClick={() => handleOpenEditModal(study)} className="bg-white text-brand-gray-800 font-semibold py-1.5 px-3 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors text-xs flex items-center justify-center gap-1">
                            <PencilIcon className="w-3 h-3" /> Editar
                        </button>
                        <button onClick={() => handleDeleteStudy(study.id)} className="bg-white text-red-600 font-semibold py-1.5 px-3 rounded-lg border border-brand-gray-300 hover:bg-red-50 transition-colors text-xs flex items-center justify-center gap-1">
                            <TrashIcon className="w-3 h-3" /> Excluir
                        </button>
                      </>
                  )}
                  {study.materialUrl && (
                      <a href={study.materialUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-gray-900 text-white font-semibold py-1.5 px-3 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center justify-center gap-1 text-xs">
                          <DownloadIcon className="w-3 h-3" /> Material
                      </a>
                  )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Studies;