import { useEffect, useState } from 'react'
import './TransactionsStyles.css'
import { api } from '../../lib/axios'
import TableRow from '../TableRow/TableRow';
interface Transaction {
    id: number;
    title: string;
    paymentMethod: string;
    category: string;
    amount: string;
}

const Transaction = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transactions');
                console.log('Dados da API:', response.data.transactions); // Verifique o formato da resposta aqui
                setTransactions(response.data.transactions);
            } catch (error) {
                console.error('Erro ao buscar as transações:', error);
            }
        };

        fetchTransactions();
    }, []);



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
                            />
                        ))}

                </table>
            </div>
        </div>
    )
}

export default Transaction
