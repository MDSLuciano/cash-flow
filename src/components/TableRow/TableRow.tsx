import { TRANSACTION_CATEGORIES_LABELS, TRANSACTION_PAYMENT_METHOD_LABELS } from '../../constant/transaction';
import './TableRow.css'

interface TableRowProps {
    id: number;
    title: string;
    paymentMethod: string;
    category: string;
    amount: number;
    onDelete: () => void;
}

const TableRow = ({ id, title, paymentMethod, category, amount, onDelete }: TableRowProps) => {
    const formatCurrency = (value: string | number): string => {
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numericValue);
    };
    
    return (
        <tbody className="dark-table-body">
                <tr className="dark-table-row" key={id}>
                    <td className="dark-table-cell">{id}</td>
                    <td className="dark-table-cell dark-highlight">{title}</td>
                    <td className="dark-table-cell dark-highlight">{TRANSACTION_PAYMENT_METHOD_LABELS[paymentMethod]}</td>
                    <td className="dark-table-cell dark-highlight">{TRANSACTION_CATEGORIES_LABELS[category]}</td>
                    <td className="dark-table-cell dark-amount">{formatCurrency(amount)}</td>
                    <td className="dark-table-cell dark-actions">
                        <button className="action-btn edit">Editar</button>
                        <button className="action-btn delete" onClick={onDelete}>Excluir</button>
                    </td>
                </tr>
        </tbody>
    );
}

export default TableRow;
