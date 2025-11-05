import React, { useState, useEffect } from 'react';
import { Study, Lesson, Question, Answer } from '../types';
import { PlusIcon, TrashIcon, FileTextIcon } from './Icons';


interface StudyModalProps {
    onClose: () => void;
    onSave: (studyData: Omit<Study, 'id' | 'progress'>, studyId?: number) => void;
    study: Study | null;
}

const emptyAnswer = (): Answer => ({ text: '', isCorrect: false });
const emptyQuestion = (): Question => ({ id: Date.now(), text: '', answers: [emptyAnswer(), emptyAnswer()] });
const emptyLesson = (): Lesson => ({ id: Date.now(), title: '', questions: [emptyQuestion()] });

const StudyModal: React.FC<StudyModalProps> = ({ onClose, onSave, study }) => {
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [leader, setLeader] = useState('');
    const [schedule, setSchedule] = useState('');
    const [description, setDescription] = useState('');
    const [scripture, setScripture] = useState('');
    const [lessons, setLessons] = useState<Lesson[]>([emptyLesson()]);
    const [materialFile, setMaterialFile] = useState<File | null>(null);
    const [materialFileName, setMaterialFileName] = useState<string>('');


    useEffect(() => {
        if (study) {
            setTitle(study.title);
            setTheme(study.theme);
            setLeader(study.leader);
            setSchedule(study.schedule);
            setDescription(study.description);
            setScripture(study.scripture);
            setLessons(study.lessons?.length > 0 ? study.lessons : [emptyLesson()]);
            if(study.materialUrl) {
                setMaterialFileName('Material existente anexado.');
            }
        }
    }, [study]);
    
    // Lesson handlers
    const handleAddLesson = () => setLessons([...lessons, emptyLesson()]);
    const handleRemoveLesson = (lessonId: number) => setLessons(lessons.filter(l => l.id !== lessonId));
    const handleLessonChange = (lessonId: number, field: 'title', value: string) => {
        setLessons(lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l));
    };

    // Question handlers
    const handleAddQuestion = (lessonId: number) => {
        setLessons(lessons.map(l => l.id === lessonId ? { ...l, questions: [...l.questions, emptyQuestion()] } : l));
    };
    const handleRemoveQuestion = (lessonId: number, questionId: number) => {
        setLessons(lessons.map(l => l.id === lessonId ? { ...l, questions: l.questions.filter(q => q.id !== questionId) } : l));
    };
    const handleQuestionChange = (lessonId: number, questionId: number, value: string) => {
        setLessons(lessons.map(l => l.id === lessonId ? { ...l, questions: l.questions.map(q => q.id === questionId ? { ...q, text: value } : q) } : l));
    };

    // Answer handlers
    const handleAddAnswer = (lessonId: number, questionId: number) => {
        setLessons(lessons.map(l => l.id === lessonId ? { ...l, questions: l.questions.map(q => q.id === questionId ? { ...q, answers: [...q.answers, emptyAnswer()] } : q) } : l));
    };
    const handleRemoveAnswer = (lessonId: number, questionId: number, answerIndex: number) => {
        setLessons(lessons.map(l => l.id === lessonId ? { ...l, questions: l.questions.map(q => q.id === questionId ? { ...q, answers: q.answers.filter((_, i) => i !== answerIndex) } : q) } : l));
    };
    const handleAnswerChange = (lessonId: number, questionId: number, answerIndex: number, value: string) => {
        setLessons(lessons.map(l => l.id === lessonId ? { ...l, questions: l.questions.map(q => q.id === questionId ? { ...q, answers: q.answers.map((a, i) => i === answerIndex ? { ...a, text: value } : a) } : q) } : l));
    };
    const handleCorrectAnswerChange = (lessonId: number, questionId: number, correctIndex: number) => {
        setLessons(lessons.map(l => l.id === lessonId ? { ...l, questions: l.questions.map(q => q.id === questionId ? { ...q, answers: q.answers.map((a, i) => ({ ...a, isCorrect: i === correctIndex })) } : q) } : l));
    };
    
    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setMaterialFile(file);
            setMaterialFileName(file.name);
        } else {
            setMaterialFile(null);
            setMaterialFileName('');
            if (file) alert("Por favor, selecione um arquivo PDF válido.");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let materialUrl = study?.materialUrl;

        if (materialFile) {
            materialUrl = URL.createObjectURL(materialFile);
        }
        
        onSave({ title, theme, leader, schedule, description, scripture, lessons, materialUrl }, study?.id);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-brand-gray-200">
                    <h2 className="text-xl font-bold text-brand-gray-900">{study ? 'Editar Estudo' : 'Criar Novo Estudo'}</h2>
                    <p className="text-sm text-brand-gray-600">Preencha os detalhes do estudo bíblico.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <label className="label">Título do Estudo</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="input-field" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="label">Descrição</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={2} className="input-field"></textarea>
                        </div>
                        <div>
                            <label className="label">Tema</label>
                            <input type="text" value={theme} onChange={e => setTheme(e.target.value)} required className="input-field" />
                        </div>
                        <div>
                            <label className="label">Referência Bíblica</label>
                            <input type="text" value={scripture} onChange={e => setScripture(e.target.value)} required className="input-field" />
                        </div>
                        <div>
                            <label className="label">Líder do Estudo</label>
                            <input type="text" value={leader} onChange={e => setLeader(e.target.value)} required className="input-field" />
                        </div>
                        <div>
                            <label className="label">Dia e Horário</label>
                            <input type="text" value={schedule} onChange={e => setSchedule(e.target.value)} required className="input-field" />
                        </div>
                         {/* PDF Upload */}
                        <div className="sm:col-span-2">
                            <label className="label">Material de Apoio (PDF)</label>
                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-brand-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <FileTextIcon className="mx-auto h-12 w-12 text-brand-gray-400" />
                                    <div className="flex text-sm text-brand-gray-600">
                                        <label htmlFor="pdf-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-purple hover:text-brand-purple-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-purple">
                                            <span>Carregar um arquivo PDF</span>
                                            <input id="pdf-upload" name="pdf-upload" type="file" className="sr-only" accept="application/pdf" onChange={handlePdfChange} />
                                        </label>
                                        <p className="pl-1">ou arraste e solte</p>
                                    </div>
                                    <p className="text-xs text-brand-gray-500">{materialFileName || 'Nenhum arquivo selecionado'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Lessons and Questions */}
                    <div className="space-y-4">
                        {lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="p-4 border border-brand-gray-200 rounded-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg text-brand-gray-800">Lição {lessonIndex + 1}</h3>
                                    {lessons.length > 1 && <button type="button" onClick={() => handleRemoveLesson(lesson.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-5 h-5"/></button>}
                                </div>
                                <input placeholder="Título da Lição" value={lesson.title} onChange={e => handleLessonChange(lesson.id, 'title', e.target.value)} required className="input-field w-full" />
                                
                                {lesson.questions.map((question, questionIndex) => (
                                    <div key={question.id} className="p-3 bg-brand-gray-50 rounded-md space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="label">Pergunta {questionIndex + 1}</label>
                                            {lesson.questions.length > 1 && <button type="button" onClick={() => handleRemoveQuestion(lesson.id, question.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-4 h-4"/></button>}
                                        </div>
                                        <input placeholder="Texto da pergunta" value={question.text} onChange={e => handleQuestionChange(lesson.id, question.id, e.target.value)} required className="input-field w-full" />
                                        
                                        <div className="space-y-2 pt-2">
                                            {question.answers.map((answer, answerIndex) => (
                                                <div key={answerIndex} className="flex items-center gap-2">
                                                    <input type="radio" name={`correct-answer-${lesson.id}-${question.id}`} checked={answer.isCorrect} onChange={() => handleCorrectAnswerChange(lesson.id, question.id, answerIndex)} className="h-4 w-4 text-brand-purple focus:ring-brand-purple border-gray-300"/>
                                                    <input placeholder={`Resposta ${answerIndex + 1}`} value={answer.text} onChange={e => handleAnswerChange(lesson.id, question.id, answerIndex, e.target.value)} required className="input-field flex-1" />
                                                    {question.answers.length > 2 && <button type="button" onClick={() => handleRemoveAnswer(lesson.id, question.id, answerIndex)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-4 h-4"/></button>}
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" onClick={() => handleAddAnswer(lesson.id, question.id)} className="text-sm font-semibold text-brand-purple hover:underline mt-2">Adicionar Resposta</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddQuestion(lesson.id)} className="text-sm font-semibold text-brand-purple hover:underline">+ Adicionar Pergunta</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddLesson} className="w-full text-center font-semibold py-2 px-4 rounded-lg border-2 border-dashed border-brand-gray-300 hover:bg-brand-gray-100 transition-colors text-brand-gray-700">
                            + Adicionar Lição
                        </button>
                    </div>

                    <div className="p-6 border-t border-brand-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                        <button type="button" onClick={onClose} className="bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors">
                           Salvar Estudo
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                .input-field { appearance: none; position: relative; display: block; width: 100%; padding: 0.75rem; border-width: 1px; border-color: #CED4DA; border-radius: 0.5rem; }
                .input-field:focus { outline: none; --tw-ring-color: #F3F4FB; box-shadow: 0 0 0 2px var(--tw-ring-color); border-color: #6D28D9; z-index: 10; }
                .label { display: block; font-size: 0.875rem; font-weight: 500; color: #495057; margin-bottom: 0.25rem; }
            `}</style>
        </div>
    );
};

export default StudyModal;