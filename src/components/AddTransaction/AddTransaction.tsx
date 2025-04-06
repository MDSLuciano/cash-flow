import { useState } from 'react';
import Modal from '../Modal/Modal';
import './AddTransactionStyles.css';
import { api } from '../../lib/axios';

interface TransactionData {
    title: string;
    amount: number;
    type: string;
    category: string;
    paymentMethod: string;
}

interface Transaction {
    id: number;
    title: string;
    type: string;
    paymentMethod: string;
    category: string;
    amount: number;
}

const AddTransaction = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const refreshData = async () => {
        try {
            const response = await api.get('/transactions');
            setTransactions(response.data.transactions); // Atualize o estado
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };
    

    const saveTransaction = async (transactionData: TransactionData) => {
        console.log(transactionData);
        await api.post('/', transactionData)
        refreshData()
    }
    return (
        <div>
            <button className='button-add' onClick={openModal}>Adicionar Transação</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} onSaveTransaction={saveTransaction} />
        </div>
    );
}

export default AddTransaction;
