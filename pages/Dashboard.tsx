import React from 'react';
import Card from '../components/Card';
import { ClockIcon, LocationMarkerIcon, UsersIcon } from '../components/Icons';
import PendingApprovals from '../components/PendingApprovals';
import { DashboardData, Role } from '../types';

interface DashboardProps {
  data: DashboardData;
  currentUserRole: Role;
}

const Dashboard: React.FC<DashboardProps> = ({ data, currentUserRole }) => {
  const { stats, upcomingEvents, ongoingStudies, pendingApprovals } = data;
  const isLeader = currentUserRole === 'Líder';
  
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center p-5">
            <div className={`p-3 rounded-full mr-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-brand-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-brand-gray-800">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pending Approvals - For Leaders */}
        {isLeader && pendingApprovals && pendingApprovals.length > 0 && (
          <div className="lg:col-span-3">
             <PendingApprovals initialApprovals={pendingApprovals} />
          </div>
        )}

        {/* Upcoming Events */}
        <Card className="lg:col-span-2 p-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-brand-gray-800">Próximos Eventos</h2>
            <p className="text-brand-gray-500">Eventos agendados para esta semana</p>
          </div>
          <div className="space-y-4 px-6 pb-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 bg-brand-purple-light/50 rounded-xl">
                <div className="text-center bg-brand-purple rounded-lg text-white p-3 font-bold">
                  <p className="text-xs">{event.month}</p>
                  <p className="text-2xl leading-none">{event.day}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gray-900">{event.title}</h3>
                  <div className="flex items-center text-sm text-brand-gray-600 space-x-4 mt-1">
                    <span className="flex items-center gap-1.5"><ClockIcon /> {event.time}</span>
                    <span className="flex items-center gap-1.5"><LocationMarkerIcon /> {event.location}</span>
                  </div>
                  <div className="mt-2 text-xs font-medium bg-white border border-brand-gray-300 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
                    <UsersIcon className="w-4 h-4" />
                    {event.attendees}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ongoing Studies */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-bold text-brand-gray-800">Estudos Bíblicos em Andamento</h2>
          <p className="text-brand-gray-500 mb-6">Progresso dos estudos atuais</p>
          <div className="space-y-6">
            {ongoingStudies.map((study) => (
              <div key={study.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-brand-gray-900">{study.title}</h3>
                  <span className="text-sm font-medium text-brand-gray-600">{study.progress}%</span>
                </div>
                <p className="text-sm text-brand-gray-500 mb-2">{study.scripture}</p>
                <div className="w-full bg-brand-gray-200 rounded-full h-2.5">
                  <div className="bg-brand-purple h-2.5 rounded-full" style={{ width: `${study.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;