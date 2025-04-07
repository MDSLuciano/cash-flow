import { useEffect } from 'react';
import { useTransactions } from '../../contexts/TransactionContext';
import AddTransaction from '../AddTransaction/AddTransaction';
import './SummaryStyle.css'

const Summary = () => {
    const { summary, refreshSummary } = useTransactions(); // Consumindo o contexto

    useEffect(() => {
        refreshSummary(); // Atualiza os dados ao carregar o componente
    }, [])
    return (
        <div className='summary-container'>
            <div className='summary-card'>
                <p className="summary-title">Saldo Geral:</p>
                <p id="balance" className='summary-value'>R$ {summary.netBalance.toFixed(2)}</p>
            </div>

            <div className='summary-card'>
                <p className="summary-title">Total Crédito:</p>
                <p id="total-income" className='summary-value'>R$ {summary.totalCredit.toFixed(2)}</p>
            </div>

            <div className='summary-card'>
                <p className="summary-title">Total Débito:</p>
                <p id="total-expense" className='summary-value'>R$ {summary.totalDebit.toFixed(2)}</p>
            </div>
            <AddTransaction />
        </div>
    );
}

export default Summary;
