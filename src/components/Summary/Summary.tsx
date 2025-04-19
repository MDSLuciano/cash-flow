import { useEffect } from 'react';
import { useTransactions } from '../../contexts/TransactionContext';
import AddTransaction from '../AddTransaction/AddTransaction';
import './SummaryStyle.css'
import SummaryCard from '../SummaryCard/SummaryCard';
import { FaWallet } from 'react-icons/fa6';
import { TbTrendingDown, TbTrendingUp } from 'react-icons/tb';

const Summary = () => {
    const { summary, refreshSummary } = useTransactions(); // Consumindo o contexto

    useEffect(() => {
        refreshSummary(); // Atualiza os dados ao carregar o componente
    }, [])
    return (
        <div className='summary-container'>
            <SummaryCard 
                title='Saldo Geral:'
                value={summary.netBalance}
                className={summary.netBalance < 0 ? 'expense-card' : ''}
                icon={<FaWallet />}
            />
            
            <SummaryCard
                title='Total Crédito:'
                value={summary.totalCredit}
                className='income-card'
                icon={<TbTrendingUp />}
            />

            <SummaryCard
                title='Total Débito:'
                value={summary.totalDebit}
                className='expense-card'
                icon={<TbTrendingDown />}
            />
            <AddTransaction />
        </div>
    );
}

export default Summary;
