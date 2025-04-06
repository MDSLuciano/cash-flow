import './App.css'
import AddTransaction from './components/AddTransaction/AddTransaction'
import { TransactionProvider } from './contexts/TransactionContext'
import Transaction from './pages/Transactions/Transactions'

function App() {

  return (
    <>
      <h1>CashFlow+</h1>
      <p>Seu gerenciador de finanças pessoal.</p>
      <TransactionProvider>
        <AddTransaction />
        <Transaction />
      </TransactionProvider>
    </>
  )
}

export default App
