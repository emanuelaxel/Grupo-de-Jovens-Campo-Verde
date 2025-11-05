import React, { useState } from 'react';
import Card from '../components/Card';
import { Event, Role } from '../types';
import { ClockIcon, LocationMarkerIcon, UsersIcon, CheckIcon, PlusIcon, TrashIcon } from '../components/Icons';
import EventModal from '../components/EventModal';
import EventDetailsModal from '../components/EventDetailsModal';
import { appData } from '../data';

interface EventsProps {
  currentUserRole: Role;
}

const Events: React.FC<EventsProps> = ({ currentUserRole }) => {
  const [events, setEvents] = useState<Event[]>(appData.events);
  const [confirmedEvents, setConfirmedEvents] = useState<Set<number>>(new Set());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const canManageEvents = ['Líder', 'Pastor', 'Regente', 'Tesoureiro'].includes(currentUserRole);
  
  const handleToggleConfirmation = (eventId: number) => {
    const newConfirmedSet = new Set(confirmedEvents);
    let newEvents = [...events];
    const eventIndex = newEvents.findIndex(e => e.id === eventId);
    if(eventIndex === -1) return;

    if (newConfirmedSet.has(eventId)) {
      newConfirmedSet.delete(eventId);
      newEvents[eventIndex].confirmedAttendees--;
    } else {
      if (newEvents[eventIndex].confirmedAttendees < newEvents[eventIndex].maxAttendees) {
        newConfirmedSet.add(eventId);
        newEvents[eventIndex].confirmedAttendees++;
      } else {
        alert("O número máximo de participantes foi atingido.");
      }
    }
    
    setConfirmedEvents(newConfirmedSet);
    setEvents(newEvents);
  };
  
  const handleAddEvent = (newEventData: Omit<Event, 'id' | 'day' | 'month' | 'categoryColor' | 'confirmedAttendees'>) => {
      const date = new Date(`${newEventData.date}T00:00:00`);
      const day = date.toLocaleDateString('pt-BR', { day: '2-digit' });
      const month = date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');

      const newEvent: Event = {
          id: Date.now(), // simple unique ID
          ...newEventData,
          day,
          month,
          categoryColor: 'bg-yellow-200 text-yellow-800', // Default color for new events
          confirmedAttendees: 0,
      };
      
      setEvents(prevEvents => [newEvent, ...prevEvents]);
      setIsCreateModalOpen(false);
  };

  const handleShowDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.')) {
        setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
    }
  };


  return (
    <div className="space-y-6">
      {isCreateModalOpen && <EventModal onClose={() => setIsCreateModalOpen(false)} onSave={handleAddEvent} />}
      {selectedEvent && <EventDetailsModal event={selectedEvent} onClose={handleCloseDetails} />}


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-gray-800">Próximos Eventos</h1>
          <p className="text-brand-gray-600 mt-1">Veja e gerencie os eventos do grupo</p>
        </div>
        {canManageEvents && (
            <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 md:mt-0 bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center gap-2">
              <PlusIcon className="w-5 h-5" /> Novo Evento
            </button>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-3 rounded-xl border border-brand-gray-200/50">
          <div className="relative w-full sm:w-auto flex-grow sm:max-w-xs">
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" placeholder="Buscar eventos..." className="w-full bg-brand-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple-light text-brand-gray-700 placeholder-brand-gray-500" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button className="bg-brand-gray-100 text-brand-gray-700 font-semibold px-4 py-2 rounded-lg">Próximos</button>
            <button className="text-brand-gray-500 font-semibold px-4 py-2 rounded-lg hover:bg-brand-gray-100">Passados</button>
            <button className="text-brand-gray-500 font-semibold px-4 py-2 rounded-lg hover:bg-brand-gray-100">Todos</button>
          </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const isConfirmed = confirmedEvents.has(event.id!);
          return (
            <Card key={event.id} className="p-0 flex flex-col overflow-hidden relative">
                {canManageEvents && (
                    <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors z-10"
                        aria-label="Excluir evento"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                )}
                {event.bannerUrl && (
                    <img src={event.bannerUrl} alt={event.title} className="w-full h-32 object-cover"/>
                )}
              <div className="p-6">
                  <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                          <div className="text-center bg-brand-purple/10 text-brand-purple rounded-lg p-3 font-bold flex-shrink-0">
                              <p className="text-xs">{event.month}</p>
                              <p className="text-2xl leading-none">{event.day}</p>
                          </div>
                          <div>
                              <h2 className="text-lg font-bold text-brand-gray-900">{event.title}</h2>
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${event.categoryColor}`}>{event.category}</span>
                          </div>
                      </div>
                  </div>
                  <p className="text-sm text-brand-gray-600 mt-4 line-clamp-2">{event.description}</p>
              </div>
              
              <div className="px-6 pb-6 space-y-3 text-sm text-brand-gray-600">
                <span className="flex items-center gap-2"><ClockIcon className="w-5 h-5"/> {event.time}</span>
                <span className="flex items-center gap-2"><LocationMarkerIcon className="w-5 h-5"/> {event.location}</span>
                <span className="flex items-center gap-2"><UsersIcon className="w-5 h-5"/> {event.confirmedAttendees}/{event.maxAttendees} confirmados</span>
              </div>

              <div className="mt-auto p-4 border-t border-brand-gray-200 flex space-x-2">
                <button onClick={() => handleShowDetails(event)} className="flex-1 bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors">
                  Detalhes
                </button>
                <button 
                  onClick={() => handleToggleConfirmation(event.id!)}
                  className={`flex-1 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 ${
                    isConfirmed 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-brand-gray-900 text-white hover:bg-brand-gray-800'
                  }`}
                >
                  {isConfirmed && <CheckIcon className="w-5 h-5" />}
                  {isConfirmed ? 'Presença Confirmada' : 'Confirmar Presença'}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Events;