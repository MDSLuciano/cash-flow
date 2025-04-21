import { useEffect, useState } from 'react';
import { TRANSACTION_CATEGORIES, TRANSACTION_PAYMENT_METHODS, TRANSACTION_TYPES } from '../../constant/transaction';
import './ModalStyles.css';
import TransactionCalendar from '../TransactionCalendar/TransactionCalendar';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveTransaction: (transactionData: TransactionDate) => void | Promise<void>;
    isEdit: boolean; // Indica se o modal está em modo de edição.
    initialData?: TransactionDate; // Dados iniciais da transação para edição.
}

interface TransactionDate {
    id: number
    title: string;
    amount: number;
    type: string;
    category: string;
    paymentMethod: string;
    transactionDate: string; // Garantir que inclua a data
}

const Modal = ({isOpen, onClose, onSaveTransaction, isEdit, initialData}:ModalProps) => {
    const [formData, setFormData] = useState<TransactionDate>({
        id: 0,
        title: '',
        amount: 0,
        type: 'debit',
        category: 'OTHER',
        paymentMethod: 'CASH',
        transactionDate: '' // Inicializa sem data
    })

    // Carrega os dados iniciais ao abrir o modal em modo de edição.
    useEffect(() => {
        if (isOpen){
          if (isEdit && initialData) {
              setFormData(initialData);// Modo de edição: carrega os dados existentes
          }else if (!isEdit){
              setFormData({ // Modo de adição: valores padrão
                id: 0,
                title: '',
                amount: 0,
                type: 'debit',
                category: 'OTHER',
                paymentMethod: 'CASH',
                transactionDate: '' // Reset na data apenas ao adicionar
              })
          }
        }
    }, [isEdit, isOpen, initialData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]:name === 'amount' ? parseFloat(value) : value });
    }

    const handleDateChange = (date: Date) => {
        setFormData({ ...formData, transactionDate: date.toISOString() }) // Atualiza o data escolhida no estado
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.transactionDate) {
      alert('Por favor, selecione uma data!');
      return;
    }

    const transactionData = {
      ...formData,
      transactionDate: formData.transactionDate, // Passa a data junto com os outros valores
    }
    try {
      await onSaveTransaction(transactionData); // Envia formData com transactionDate ao backend
      onClose(); // Fecha o modal
    } catch (error) {
      console.error('Error saving transaction:', error)
    }
  };

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
                    <div className="form-group">
                      <label htmlFor='transactionDate'>Data da Transação:</label>
                      <TransactionCalendar
                        initialDate={formData.transactionDate ? new Date(formData.transactionDate): new Date()} //Passa a data inicial, se houver.
                        onDateChange={handleDateChange}
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
