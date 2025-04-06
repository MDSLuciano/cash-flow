import { useEffect, useState } from 'react';
import './TransactionsStyles.css';
import { api } from '../../lib/axios';
import TableRow from '../../components/TableRow/TableRow';

interface Transaction {
    id: number;
    title: string;
    paymentMethod: string;
    category: string;
    amount: number;
}

const Transaction = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const refreshData = async () => {
        try {
            const response = await api.get('/transactions'); // Refaça a chamada para obter os dados atualizados
            setTransactions(response.data.transactions); // Atualize o estado
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
        }
    };

    useEffect(() => {
        refreshData() 
    }, []);
    
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/${id}`); // Faça o DELETE na API
            console.log(`Transação ${id} removida com sucesso.`);
            await refreshData(); // Atualize os dados da tabela
        } catch (error) {
            console.error(`Erro ao excluir a transação ${id}:`, error);
        }
    };

    

    return (
        <div className="table-container">
            <div className="table-wrapper">
                <table className="dark-table">
                    <thead className="dark-table-header">
                        <tr>
                            <th className="dark-header-cell">Id</th>
                            <th className="dark-header-cell">Descrição</th>
                            <th className="dark-header-cell">Meio de Pagamento</th>
                            <th className="dark-header-cell">Categoria</th>
                            <th className="dark-header-cell">Valor</th>
                            <th className="dark-header-cell"></th>
                        </tr>
                    </thead>
                        {transactions.map((transaction) => (
                            <TableRow 
                                key={transaction.id}
                                id={transaction.id}
                                title={transaction.title}
                                paymentMethod={transaction.paymentMethod}
                                category={transaction.category}
                                amount={transaction.amount}
                                onDelete={() => handleDelete(transaction.id)}
                            />
                        ))}

                </table>
            </div>
        </div>
    )
}

export default Transaction
