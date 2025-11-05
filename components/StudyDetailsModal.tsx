import React, { useState } from 'react';
import { Study, Comment } from '../types';
import { BookOpenIcon, ClockIcon, UserIcon, DownloadIcon, FileTextIcon } from './Icons';

interface StudyDetailsModalProps {
    study: Study;
    onClose: () => void;
    onAddComment: (commentText: string) => void;
}

const StudyDetailsModal: React.FC<StudyDetailsModalProps> = ({ study, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const currentUser = { name: 'Usuário', initials: 'U' };

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-gray-200">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800`}>{study.theme}</span>
                    <h2 className="text-2xl font-bold text-brand-gray-900 mt-2">{study.title}</h2>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    <div>
                        <p className="text-brand-gray-600">{study.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-4 border-t border-brand-gray-200">
                            <div className="flex items-center gap-3 text-brand-gray-700">
                                <BookOpenIcon className="w-5 h-5 text-brand-gray-500" />
                                <span>{study.scripture}</span>
                            </div>
                            <div className="flex items-center gap-3 text-brand-gray-700">
                                <UserIcon className="w-5 h-5 text-brand-gray-500" />
                                <span>Liderado por {study.leader}</span>
                            </div>
                             <div className="flex items-center gap-3 text-brand-gray-700">
                                <ClockIcon className="w-5 h-5 text-brand-gray-500" />
                                <span>{study.schedule}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-brand-gray-800 mb-2">Lições do Estudo</h3>
                        <ul className="space-y-2">
                           {study.lessons.map(lesson => (
                               <li key={lesson.id} className="p-3 bg-brand-gray-100 rounded-lg text-sm font-medium text-brand-gray-800 flex items-center gap-3">
                                   <FileTextIcon className="w-5 h-5 text-brand-purple" />
                                   {lesson.title}
                                </li>
                           ))}
                        </ul>
                    </div>

                    {study.materialUrl && (
                        <a href={study.materialUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-brand-gray-900 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center justify-center gap-2 text-sm">
                            <DownloadIcon className="w-5 h-5" /> Baixar Material de Apoio
                        </a>
                    )}
                    
                    {/* Comments Section */}
                    <div className="pt-6 border-t border-brand-gray-200">
                        <h3 className="font-bold text-brand-gray-800 mb-4">Comentários</h3>
                        <div className="space-y-4">
                            {(study.comments && study.comments.length > 0) ? (
                                study.comments.map(comment => (
                                    <div key={comment.id} className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${comment.authorAvatarColor}`}>
                                            {comment.authorInitials}
                                        </div>
                                        <div className="flex-1 bg-brand-gray-100 p-3 rounded-lg">
                                            <div className="flex items-baseline justify-between">
                                                <p className="font-semibold text-sm text-brand-gray-900">{comment.authorName}</p>
                                                <p className="text-xs text-brand-gray-500">{comment.timestamp}</p>
                                            </div>
                                            <p className="text-sm text-brand-gray-700 mt-1">{comment.text}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-brand-gray-500 text-center py-4">Nenhum comentário ainda. Seja o primeiro a compartilhar!</p>
                            )}
                        </div>
                        <form onSubmit={handleSubmitComment} className="mt-6 flex items-start gap-3">
                             <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-purple-500 to-indigo-600">
                                {currentUser.initials}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Escreva seu comentário..."
                                    rows={2}
                                    className="w-full p-2 border border-brand-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all text-sm"
                                ></textarea>
                                <button type="submit" className="mt-2 bg-brand-gray-900 text-white font-semibold py-2 px-3 rounded-lg text-sm hover:bg-brand-gray-800">
                                    Publicar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="p-4 border-t border-brand-gray-200 flex justify-end bg-brand-gray-50">
                    <button type="button" onClick={onClose} className="bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudyDetailsModal;