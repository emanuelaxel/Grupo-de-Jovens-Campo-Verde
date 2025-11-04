import React from 'react';
import { Event } from '../types';
import { CalendarIcon, ClockIcon, LocationMarkerIcon, UsersIcon } from './Icons';

interface EventDetailsModalProps {
    event: Event;
    onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
    const fullDate = new Date(`${event.date}T00:00:00`).toLocaleDateString('pt-BR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                {event.bannerUrl && (
                    <img src={event.bannerUrl} alt={event.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6 flex-1 overflow-y-auto">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${event.categoryColor}`}>{event.category}</span>
                    <h2 className="text-2xl font-bold text-brand-gray-900 mt-2">{event.title}</h2>
                    <p className="text-brand-gray-600 mt-4">{event.description}</p>
                    
                    <div className="mt-6 border-t border-brand-gray-200 pt-4 space-y-3">
                         <div className="flex items-center gap-3 text-brand-gray-700">
                            <CalendarIcon className="w-5 h-5 text-brand-gray-500" />
                            <span>{fullDate}</span>
                        </div>
                        <div className="flex items-center gap-3 text-brand-gray-700">
                            <ClockIcon className="w-5 h-5 text-brand-gray-500" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-brand-gray-700">
                            <LocationMarkerIcon className="w-5 h-5 text-brand-gray-500" />
                            <span>{event.location}</span>
                        </div>
                         <div className="flex items-center gap-3 text-brand-gray-700">
                            <UsersIcon className="w-5 h-5 text-brand-gray-500" />
                            <span>{event.confirmedAttendees} de {event.maxAttendees} participantes confirmados</span>
                        </div>
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

export default EventDetailsModal;
