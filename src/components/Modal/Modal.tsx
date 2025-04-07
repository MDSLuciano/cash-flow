import { useEffect, useState } from 'react';
import { TRANSACTION_CATEGORIES, TRANSACTION_PAYMENT_METHODS, TRANSACTION_TYPES } from '../../constant/transaction';
import './ModalStyles.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveTransaction: (transactionData: TransactionData) => void;
    isEdit: boolean; // Indica se o modal está em modo de edição.
    initialData?: TransactionData; // Dados iniciais da transação para edição.
}

interface TransactionData {
    id: number
    title: string;
    amount: number;
    type: string;
    category: string;
    paymentMethod: string;
}

const Modal = ({isOpen, onClose, onSaveTransaction, isEdit, initialData}:ModalProps) => {
    const [formData, setFormData] = useState<TransactionData>({
        id: 0,
        title: '',
        amount: 0,
        type: 'debit',
        category: 'OTHER',
        paymentMethod: 'CASH',
    })

    // Carrega os dados iniciais ao abrir o modal em modo de edição.
    useEffect(() => {
        if (isEdit && initialData) {
            setFormData(initialData);
        }
    }, [isEdit, initialData]);
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:name === 'amount' ? parseFloat(value) : value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSaveTransaction(formData); // Passa os dados para salvar a transação.
    }

    if(!isOpen) return null

    return (
        <div className='modal-overlay'>
            <div className="modal">
                <button className='modal-close' onClick={onClose}>&times;</button>
                <h1 className='modal-title'>{isEdit ? 'Editar Transação' :'Adicionar Transação'}</h1>
                <form className='modal-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='title'>Título:</label>
                        <input 
                            type='text' 
                            id='title' 
                            name='title' 
                            value={formData.title}
                            onChange={handleChange}
                            className='form-input' 
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='amount'>Valor:</label>
                        <input 
                        type='number' 
                        id='amount' 
                        name='amount' 
                        className='form-input' 
                        min="1" step="0.01" 
                        title="Insira um valor válido"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='type'>Tipo de Transação:</label>
                        <select 
                            name='type' id='type' 
                            className='form-select' 
                            value={formData.type} 
                            onChange={handleChange} 
                            required>
                            {TRANSACTION_TYPES.map((type) => (
                                <option key={type.key} value={type.key}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="category">Categoria:</label>
                        <select id="category" name="category" 
                            value={formData.category}
                            onChange={handleChange}
                            className="form-select" 
                            required>
                            {TRANSACTION_CATEGORIES.map((category) => (
                                <option key={category.key} value={category.key}>
                                    {category.label}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className='form-group'>
                        <label htmlFor="paymentMethod">Método de Pagamento:</label>
                        <select id="paymentMethod" name="paymentMethod"
                            className="form-select" 
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required>
                            {TRANSACTION_PAYMENT_METHODS.map((method) => (
                                <option key={method.key} value={method.key}>
                                    {method.label}
                                </option>
                            ))}
                        </select>

                        <div className='modal-actions'>
                            <button type='button' className='button-cancel' onClick={onClose}>
                                Cancelar
                            </button>
                            <button type='submit' className='button-save'>
                                {isEdit ? 'Salvar Alterações' : 'Adicionar'}
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
