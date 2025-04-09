import { useState, useEffect } from 'react';
import './TransactionsStyles.css';
import { api } from '../../lib/axios';
import TableRow from '../../components/TableRow/TableRow';
import Modal from '../../components/Modal/Modal';
import { useTransactions } from '../../contexts/TransactionContext';

interface Transaction {
    id: number;
    title: string;
    type: string;
    paymentMethod: string;
    category: string;
    amount: number;
}


const Transaction = () => {
    const { transactions, refreshTransactions, refreshSummary } = useTransactions();
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        refreshTransactions();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/${id}`);
            console.log(`Transação ${id} removida com sucesso.`);
            refreshTransactions();
            refreshSummary();
        } catch (error) {
            console.error(`Erro ao excluir a transação ${id}:`, error);
        }
    };

    const openModalForEdit = (transaction: Transaction) => {
        setCurrentTransaction(transaction); // Define os dados da transação
        setModalOpen(true); // Abre o modal
    };

    const closeModal = () => {
        setModalOpen(false); // Fecha o modal
        setCurrentTransaction(null); // Limpa os dados
    };

    const handleEditTransaction = async (updatedTransaction: Transaction) => {
        try {
            await api.put(`/${updatedTransaction.id}`, updatedTransaction); // Atualiza na API
            console.log(`Transação ${updatedTransaction.id} editada com sucesso.`);
            refreshTransactions();
            refreshSummary();
            closeModal(); // Fecha o modal
        } catch (error) {
            console.error(`Erro ao editar a transação ${updatedTransaction.id}:`, error);
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
                    <tbody className="dark-table-body">
                        {transactions.map((transaction, index) => (
                            <TableRow
                                index={index}
                                key={transaction.id}
                                id={transaction.id}
                                title={transaction.title}
                                type={transaction.type}
                                paymentMethod={transaction.paymentMethod}
                                category={transaction.category}
                                amount={transaction.amount}
                                onDelete={() => handleDelete(transaction.id)}
                                onEdit={openModalForEdit}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && currentTransaction && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSaveTransaction={handleEditTransaction}
                    isEdit={true}
                    initialData={currentTransaction}
                />
            )}
        </div>

    );
};

export default Transaction;