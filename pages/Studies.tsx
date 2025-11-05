import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { Study, Role, Comment } from '../types';
import { PlusIcon, BookOpenIcon, ClockIcon, UserIcon, DownloadIcon, PencilIcon, ChatBubbleLeftIcon, TrashIcon } from '../components/Icons';
import StudyModal from '../components/StudyModal';
import StudyDetailsModal from '../components/StudyDetailsModal';
import { supabase } from '../supabaseClient';


interface StudiesProps {
  currentUserRole: Role;
}

const Studies: React.FC<StudiesProps> = ({ currentUserRole }) => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  const canManageStudies = ['Líder', 'Pastor'].includes(currentUserRole);

  const fetchStudies = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('studies').select('*, comments(*)').order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching studies', error);
    } else {
        setStudies(data as Study[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  const handleSaveStudy = async (studyData: Omit<Study, 'id' | 'progress'>, studyId?: number) => {
    if (studyId) {
      // Edit logic
      const { error } = await supabase.from('studies').update(studyData).eq('id', studyId);
      if (error) console.error("Error updating study:", error);
    } else {
      // Add new logic
      const { error } = await supabase.from('studies').insert([{...studyData, progress: 0}]);
      if (error) console.error("Error adding study:", error);
    }
    fetchStudies();
    setIsEditModalOpen(false);
    setSelectedStudy(null);
  };

  const handleDeleteStudy = async (studyId: number | undefined) => {
    if (!studyId) return;
    if (window.confirm('Tem certeza que deseja excluir este estudo? Todos os dados, incluindo lições e comentários, serão perdidos permanentemente.')) {
        const { error } = await supabase.from('studies').delete().eq('id', studyId);
        if (error) console.error("Error deleting study:", error);
        else fetchStudies();
    }
  };

  const handleAddComment = async (studyId: number | undefined, commentText: string) => {
    if (!studyId) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const { data: profile } = await supabase.from('members').select('name, initials, avatarColor').eq('id', user.id).single();
    if (!profile) return;

    const newComment = {
        study_id: studyId,
        user_id: user.id,
        text: commentText,
        authorName: profile.name,
        authorInitials: profile.initials,
        authorAvatarColor: profile.avatarColor,
    };

    const { error } = await supabase.from('comments').insert(newComment);
    if(error) {
        console.error("Error adding comment:", error);
    } else {
        fetchStudies(); // Refetch to update comment list
        if (selectedStudy) {
            // Also update the selected study if it's open in the details modal
            setSelectedStudy(prev => prev ? {...prev, comments: [...(prev.comments || []), newComment as Comment]} : null);
        }
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
       {loading ? (
          <div className="text-center py-10">Carregando estudos...</div>
        ) : (
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
                  <h3 className="font-semibold text-sm text-brand-gray-900">Progresso ({study.lessons?.length || 0} Lições)</h3>
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
      )}
    </div>
  );
};

export default Studies;