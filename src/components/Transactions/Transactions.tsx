import { useState } from 'react'
import './TransactionsStyles.css'

export const Transaction = () => {
    const [transaction, setTransaction] = useState()


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
                        <tr className="dark-table-row">
                            <td className="dark-table-cell">1</td>
                            <td className="dark-table-cell dark-highlight">Apple MacBook Pro 17"</td>
                            <td className="dark-table-cell dark-highlight">Dinheiro</td>
                            <td className="dark-table-cell dark-highlight">Despesa</td>
                            <td className="dark-table-cell dark-amount-negative">R$ 2.999</td>
                            <td className="dark-table-cell dark-actions">
                                <button className="action-btn edit">Editar</button>
                                <button className="action-btn delete">Excluir</button>
                            </td>
                        </tr>
                        <tr className="dark-table-row">
                            <td className="dark-table-cell">2</td>
                            <td className="dark-table-cell dark-highlight">Pagamento Salário</td>
                            <td className="dark-table-cell dark-highlight">Salário</td>
                            <td className="dark-table-cell dark-highlight">Déposito Bancário</td>
                            <td className="dark-table-cell dark-amount-positive">R$ 10.000</td>
                            <td className="dark-table-cell dark-actions">
                                <button className="action-btn edit">Editar</button>
                                <button className="action-btn delete">Excluir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Transaction
