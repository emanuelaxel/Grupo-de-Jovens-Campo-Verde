import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { Poll } from '../types';
import { PlusIcon, UsersIcon } from '../components/Icons';
import PollModal from '../components/PollModal';
import { supabase } from '../supabaseClient';


const Polls: React.FC = () => {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchPolls = useCallback(async () => {
      setLoading(true);
      const { data, error } = await supabase.from('polls').select('*, poll_options(*)');
      if (error) {
        console.error("Error fetching polls:", error);
      } else {
        const pollsData = data.map(p => ({
          ...p,
          options: p.poll_options,
          totalVotes: p.poll_options.reduce((sum: number, opt: any) => sum + opt.votes, 0),
          voted: false, // In a real app, you'd check if the user has voted
        }));
        setPolls(pollsData as Poll[]);
      }
      setLoading(false);
    }, []);

    useEffect(() => {
        fetchPolls();
    }, [fetchPolls]);

    const handleVote = async (pollId: number | undefined, optionId: number) => {
      if (!pollId) return;
      // Using an RPC function in Supabase is the recommended way to handle increments atomically.
      const { error } = await supabase.rpc('increment_vote', { option_id: optionId });
      if (error) {
        console.error("Error voting:", error);
      } else {
        fetchPolls();
      }
    };
    
    const handleAddPoll = async (pollData: Omit<Poll, 'id' | 'votes' | 'voted' | 'totalVotes'>) => {
        // 1. Insert the poll question
        const { data, error } = await supabase.from('polls').insert({
            question: pollData.question,
            createdBy: pollData.createdBy,
            createdAt: pollData.createdAt,
        }).select().single();

        if (error || !data) {
            console.error("Error creating poll:", error);
            return;
        }

        // 2. Insert the options linked to the new poll
        const optionsToInsert = pollData.options.map(opt => ({
            text: opt.text,
            poll_id: data.id,
            votes: 0,
        }));

        const { error: optionsError } = await supabase.from('poll_options').insert(optionsToInsert);

        if (optionsError) {
            console.error("Error adding poll options:", optionsError);
            // Optional: delete the poll if options fail
        } else {
            fetchPolls();
        }

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
                        const percentage = poll.totalVotes! > 0 ? (option.votes / poll.totalVotes!) * 100 : 0;
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
            {loading ? (
              <div className="text-center py-10">Carregando enquetes...</div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {polls.map(poll => <PollCard key={poll.id} poll={poll} />)}
            </div>
            )}
        </div>
    );
};

export default Polls;