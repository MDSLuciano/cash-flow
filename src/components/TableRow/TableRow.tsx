import './TableRow.css'

interface TableRowProps {
    id: number;
    title: string;
    paymentMethod: string;
    category: string;
    amount: string;
}

const TableRow = ({ id, title, paymentMethod, category, amount }: TableRowProps) => {
    return (
        <tbody className="dark-table-body">
                <tr className="dark-table-row" key={id}>
                    <td className="dark-table-cell">{id}</td>
                    <td className="dark-table-cell dark-highlight">{title}</td>
                    <td className="dark-table-cell dark-highlight">{paymentMethod}</td>
                    <td className="dark-table-cell dark-highlight">{category}</td>
                    <td className="dark-table-cell dark-amount">{amount}</td>
                    <td className="dark-table-cell dark-actions">
                        <button className="action-btn edit">Editar</button>
                        <button className="action-btn delete">Excluir</button>
                    </td>
                </tr>
        </tbody>
    );
}

export default TableRow;
