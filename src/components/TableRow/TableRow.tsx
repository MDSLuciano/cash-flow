import { TRANSACTION_CATEGORIES_LABELS, TRANSACTION_PAYMENT_METHOD_LABELS } from '../../constant/transaction';
import './TableRow.css'

interface TableRowProps {
    id: number;
    index: number;
    title: string;
    type: string;
    paymentMethod: string;
    category: string;
    amount: number;
    transactionDate: string;
    onDelete: () => void;
    onEdit: (updatedTransaction: any) => void;
}

const TableRow = ({ id, index, title, type, paymentMethod, category, amount, transactionDate, onDelete, onEdit }: TableRowProps) => {

    const formatCurrency = (value: string | number): string => {
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numericValue);
    };

    const handleEditClick = () => {
        onEdit({ id, title, type, paymentMethod, category, amount, transactionDate })
    }

    return (
                <tr className="dark-table-row" key={id}>
                    <td className="dark-table-cell">{++index}</td>
                    <td className="dark-table-cell dark-highlight">{title}</td>
                    <td className="dark-table-cell dark-highlight">{TRANSACTION_PAYMENT_METHOD_LABELS[paymentMethod]}</td>
                    <td className="dark-table-cell dark-highlight">{TRANSACTION_CATEGORIES_LABELS[category]}</td>
                    <td
                      className={`dark-table-cell dark-amount ${type === 'debit' ? 'dark-amount-negative' : 'dark-amount-positive'}`}>
                        {formatCurrency(amount)}
                    </td>
                    <td className="dark-table-cell dark-highlight">
                        {new Date(transactionDate).toLocaleDateString()}
                    </td>
                    <td className="dark-table-cell dark-actions">
                        <button className="action-btn edit" onClick={handleEditClick}>Editar</button>
                        <button className="action-btn delete" onClick={onDelete}>Excluir</button>
                    </td>
                </tr>
    );
}

export default TableRow;
