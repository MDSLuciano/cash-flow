import { useState } from 'react';
import Modal from '../Modal/Modal';
import './AddTransactionStyles.css';
import { api } from '../../lib/axios';
import { useTransactions } from '../../contexts/TransactionContext';

interface TransactionData {
    title: string;
    amount: number;
    type: string;
    category: string;
    paymentMethod: string;
}

const AddTransaction = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { refreshTransactions } = useTransactions()

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    

    const saveTransaction = async (transactionData: TransactionData) => {
        await api.post('/', transactionData)
        console.log(transactionData);
        refreshTransactions()
        closeModal();
    }
    return (
        <div>
            <button className='button-add' onClick={openModal}>Adicionar Transação</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} onSaveTransaction={saveTransaction} />
        </div>
    );
}

export default AddTransaction;
