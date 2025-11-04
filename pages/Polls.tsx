import React, { useState } from 'react';
import Card from '../components/Card';
import { Poll, PollOption } from '../types';
import { PlusIcon, UsersIcon } from '../components/Icons';
import PollModal from '../components/PollModal';

interface PollsProps {
    initialPolls: Poll[];
}

const Polls: React.FC<PollsProps> = ({ initialPolls }) => {
    const [polls, setPolls] = useState(initialPolls);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleVote = (pollId: number, optionId: number) => {
        setPolls(currentPolls =>
            currentPolls.map(poll => {
                if (poll.id === pollId && !poll.voted) {
                    return {
                        ...poll,
                        voted: true,
                        totalVotes: poll.totalVotes + 1,
                        options: poll.options.map(option => 
                            option.id === optionId ? { ...option, votes: option.votes + 1 } : option
                        ),
                    };
                }
                return poll;
            })
        );
    };
    
    const handleAddPoll = (pollData: Omit<Poll, 'id' | 'votes' | 'voted' | 'totalVotes'>) => {
        const newPoll: Poll = {
            ...pollData,
            id: Date.now(),
            totalVotes: 0,
            voted: false,
        };
        setPolls(prevPolls => [newPoll, ...prevPolls]);
        setIsModalOpen(false);
    };

    const PollCard: React.FC<{ poll: Poll }> = ({ poll }) => {
        const [selectedOption, setSelectedOption] = useState<number | null>(null);

        return (
            <Card className="flex flex-col">
                <div>
                    <h2 className="text-lg font-bold text-brand-gray-900">{poll.question}</h2>
                    <p className="text-xs text-brand-gray-500 mt-1">Criada por {poll.createdBy} em {poll.createdAt}</p>
                </div>
                <div className="my-4 space-y-3">
                    {poll.options.map(option => {
                        const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                        const isSelected = selectedOption === option.id;

                        if (poll.voted) {
                            return (
                                <div key={option.id} className="relative w-full bg-brand-gray-200 rounded-lg p-3 text-sm font-medium text-brand-gray-800">
                                    <div className="absolute top-0 left-0 h-full bg-brand-purple/30 rounded-lg" style={{ width: `${percentage}%` }}></div>
                                    <div className="relative flex justify-between">
                                        <span>{option.text}</span>
                                        <span className="font-bold">{percentage.toFixed(0)}%</span>
                                    </div>
                                </div>
                            );
                        }
                        
                        return (
                             <button
                                key={option.id}
                                onClick={() => setSelectedOption(option.id)}
                                className={`w-full text-left p-3 rounded-lg border-2 transition-colors text-sm font-medium ${isSelected ? 'bg-brand-purple/20 border-brand-purple' : 'bg-white border-brand-gray-300 hover:border-brand-purple/70'}`}
                            >
                                {option.text}
                            </button>
                        );
                    })}
                </div>
                <div className="mt-auto flex justify-between items-center">
                     <div className="flex items-center gap-2 text-sm text-brand-gray-600">
                        <UsersIcon className="w-4 h-4" />
                        <span>{poll.totalVotes} votos</span>
                    </div>
                    {!poll.voted && (
                        <button
                            onClick={() => selectedOption && handleVote(poll.id, selectedOption)}
                            disabled={!selectedOption}
                            className="bg-brand-gray-900 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors disabled:bg-brand-gray-400 disabled:cursor-not-allowed"
                        >
                            Votar
                        </button>
                    )}
                </div>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            {isModalOpen && <PollModal onClose={() => setIsModalOpen(false)} onSave={handleAddPoll} />}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-brand-gray-800">Enquetes</h1>
                    <p className="text-brand-gray-600 mt-1">Vote e participe das decisões do grupo</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 md:mt-0 bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" /> Nova Enquete
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {polls.map(poll => <PollCard key={poll.id} poll={poll} />)}
            </div>
        </div>
    );
};

export default Polls;
