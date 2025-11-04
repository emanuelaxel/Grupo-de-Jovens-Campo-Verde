import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import { FinanceData, BarChartData, ChartCategory, FinanceStat } from '../types';
import { ExportIcon, ArrowUpRightIcon, ArrowDownLeftIcon, PencilIcon, CheckIcon } from '../components/Icons';

interface FinancesProps {
    data: FinanceData;
}

const StatCard: React.FC<{ stat: FinanceStat }> = ({ stat }) => (
    <Card className="p-5">
        <p className="text-sm text-brand-gray-600">{stat.label}</p>
        <div className="flex justify-between items-center mt-1">
            <p className="text-2xl font-bold text-brand-gray-800">{stat.value}</p>
            <div className="p-3 rounded-full bg-brand-gray-100">{stat.icon}</div>
        </div>
        {stat.progress !== undefined && (
            <div className="mt-3">
                <div className="w-full bg-brand-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${stat.progress}%` }}></div>
                </div>
                <p className="text-xs text-brand-gray-500 text-right mt-1">{stat.change}</p>
            </div>
        )}
    </Card>
);

const BarChart: React.FC<{ data: BarChartData[] }> = ({ data }) => {
    const maxValue = data.length > 0 ? Math.max(...data.map(d => Math.max(d.income, d.expense))) * 1.25 : 10000;
    const steps = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map(v => Math.round(v));

    return (
        <Card>
            <h2 className="text-lg font-bold text-brand-gray-800">Receitas vs Despesas</h2>
            <p className="text-sm text-brand-gray-500 mb-6">Últimos meses</p>
            {data.length > 0 ? (
                <div className="flex h-56">
                    <div className="flex flex-col justify-between text-xs text-brand-gray-500 pr-2 text-right h-48 self-end mb-6">
                        {steps.slice().reverse().map(step => <div key={step}>{step.toLocaleString('pt-BR')}</div>)}
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 grid grid-cols-6 gap-4 border-l border-brand-gray-200 pl-4 items-end h-full">
                            {data.map(d => (
                                <div key={d.month} className="flex gap-1 items-end justify-center h-full">
                                    <div className="w-full bg-red-400 rounded-t-sm" title={`Despesas: R$ ${d.expense}`} style={{ height: `${(d.expense / maxValue) * 100}%` }}></div>
                                    <div className="w-full bg-green-400 rounded-t-sm" title={`Receitas: R$ ${d.income}`} style={{ height: `${(d.income / maxValue) * 100}%` }}></div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-6 gap-4 border-l border-transparent pl-4 mt-2">
                            {data.map(d => <div key={d.month} className="text-center text-xs text-brand-gray-500">{d.month}</div>)}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-56 flex items-center justify-center text-brand-gray-500">Sem dados para exibir.</div>
            )}
            <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-400 rounded-sm"></div>Despesas</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-400 rounded-sm"></div>Receitas</div>
            </div>
        </Card>
    );
};

const PieChart: React.FC<{ title: string, subtitle: string, data: ChartCategory[] }> = ({ title, subtitle, data }) => {
    const colorMap: { [key: string]: string } = {
        'bg-teal-500': '#14b8a6', 'bg-green-400': '#4ade80', 'bg-lime-400': '#a3e635',
        'bg-cyan-500': '#06b6d4', 'bg-purple-500': '#a855f7', 'bg-indigo-500': '#6366f1',
    };

    const gradientStops = data.reduce((acc, item, index, arr) => {
        const start = index > 0 ? arr.slice(0, index).reduce((sum, i) => sum + i.percentage, 0) : 0;
        const end = start + item.percentage;
        const colorValue = colorMap[item.color] || '#000';
        acc.push(`${colorValue} ${start}% ${end}%`);
        return acc;
    }, [] as string[]).join(', ');

    return (
        <Card>
            <h2 className="text-lg font-bold text-brand-gray-800">{title}</h2>
            <p className="text-sm text-brand-gray-500 mb-6">{subtitle}</p>
            {data.length > 0 ? (
                <>
                    <div className="flex justify-center items-center my-4">
                        <div className="w-36 h-36 rounded-full" style={{ background: `conic-gradient(${gradientStops})` }}></div>
                    </div>
                    <div>
                        {data.map(item => (
                            <div key={item.name} className="flex justify-between items-center text-sm py-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
                                    <span>{item.name}: {item.percentage}%</span>
                                </div>
                                <span className="font-semibold text-brand-gray-700">R$ {item.value.toFixed(2).replace('.', ',')}</span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="h-48 flex items-center justify-center text-brand-gray-500">Sem dados de categoria.</div>
            )}
        </Card>
    );
};

const Finances: React.FC<FinancesProps> = ({ data }) => {
    const [financeData, setFinanceData] = useState(data);
    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [newGoalValue, setNewGoalValue] = useState('');

    const totalIncome = useMemo(() => 
        financeData.incomeByCategory.reduce((sum, category) => sum + category.value, 0),
        [financeData.incomeByCategory]
    );

    const handleEditGoal = () => {
        const goalStat = financeData.stats.find(s => s.label === 'Meta de Arrecadação');
        if (goalStat) {
            const numericValue = goalStat.value.replace(/[^\d,]/g, '').replace(',', '.');
            setNewGoalValue(parseFloat(numericValue).toString());
        }
        setIsEditingGoal(true);
    };

    const handleSaveGoal = () => {
        const newGoal = parseFloat(newGoalValue);
        if (isNaN(newGoal) || newGoal <= 0) {
            // simple validation
            setIsEditingGoal(false);
            return;
        }

        const newStats = financeData.stats.map(stat => {
            if (stat.label === 'Meta de Arrecadação') {
                const progress = newGoal > 0 ? Math.round((totalIncome / newGoal) * 100) : 0;
                return {
                    ...stat,
                    value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(newGoal),
                    progress: progress,
                    change: `${progress}% atingido`
                };
            }
            return stat;
        });

        setFinanceData(prevData => ({ ...prevData, stats: newStats }));
        setIsEditingGoal(false);
    };


    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-brand-gray-800">Finanças</h1>
                    <p className="text-brand-gray-600 mt-1">Gerenciamento financeiro do grupo de jovens</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button className="bg-white text-brand-gray-800 font-semibold py-2 px-4 rounded-lg border border-brand-gray-300 hover:bg-brand-gray-100 transition-colors flex items-center justify-center gap-2">
                        <ExportIcon className="w-4 h-4"/> Exportar
                    </button>
                    <button className="bg-brand-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-brand-gray-800 transition-colors flex items-center gap-2">
                        <span className="text-xl font-light">+</span> Nova Transação
                    </button>
                </div>
            </div>
            
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {financeData.stats.map((stat, index) => {
                    if (stat.label === 'Meta de Arrecadação') {
                        return (
                            <Card key={index} className="p-5">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm text-brand-gray-600">{stat.label}</p>
                                    {isEditingGoal ? (
                                        <button onClick={handleSaveGoal} className="p-1 text-green-600 hover:bg-green-100 rounded-full">
                                            <CheckIcon className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button onClick={handleEditGoal} className="p-1 text-brand-gray-500 hover:bg-brand-gray-200 rounded-full">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    {isEditingGoal ? (
                                        <div className="flex items-baseline">
                                            <span className="text-xl font-bold text-brand-gray-500 mr-1">R$</span>
                                            <input
                                                type="text"
                                                value={newGoalValue}
                                                onChange={(e) => setNewGoalValue(e.target.value.replace(/[^0-9]/g, ''))}
                                                className="text-2xl font-bold text-brand-gray-800 bg-transparent w-full focus:outline-none p-0"
                                                autoFocus
                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveGoal()}
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-2xl font-bold text-brand-gray-800">{stat.value}</p>
                                    )}
                                    <div className="p-3 rounded-full bg-brand-gray-100">{stat.icon}</div>
                                </div>
                                 {stat.progress !== undefined && (
                                    <div className="mt-3">
                                        <div className="w-full bg-brand-gray-200 rounded-full h-1.5">
                                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${stat.progress}%` }}></div>
                                        </div>
                                        <p className="text-xs text-brand-gray-500 text-right mt-1">{stat.change}</p>
                                    </div>
                                )}
                            </Card>
                        );
                    }
                    return <StatCard key={index} stat={stat} />;
                })}
            </div>

            <div className="flex items-center gap-2 border-b border-brand-gray-200">
                {['Visão Geral', 'Transações', 'Orçamento'].map((tab, index) => (
                    <button key={tab} className={`py-2 px-4 text-sm font-semibold ${index === 0 ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-brand-gray-500 hover:bg-brand-gray-200/50 rounded-t-md'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:col-span-2">
                    <BarChart data={financeData.incomeVsExpense} />
                </div>
                <PieChart title="Receitas por Categoria" subtitle="Distribuição das receitas" data={financeData.incomeByCategory} />
                <PieChart title="Despesas por Categoria" subtitle="Distribuição das despesas" data={financeData.expenseByCategory} />

                <div className="lg:col-span-2">
                    <Card>
                        <h2 className="text-lg font-bold text-brand-gray-800">Transações Recentes</h2>
                        <p className="text-sm text-brand-gray-500 mb-6">Últimos movimentos financeiros</p>
                         {financeData.recentTransactions.length > 0 ? (
                            <div className="space-y-4">
                                {financeData.recentTransactions.map(tx => (
                                    <div key={tx.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                                                {tx.type === 'income' ? <ArrowUpRightIcon className="w-5 h-5 text-green-600" /> : <ArrowDownLeftIcon className="w-5 h-5 text-red-600" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-brand-gray-800">{tx.description}</p>
                                                <p className="text-xs text-brand-gray-500">{tx.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{tx.amount}</p>
                                            <p className="text-xs text-brand-gray-500">{tx.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-brand-gray-500">Nenhuma transação recente.</div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Finances;