import './App.css'
import Summary from './components/Summary/Summary'
import { TransactionProvider } from './contexts/TransactionContext'
import Transaction from './pages/Transactions/Transactions'

function App() {

  return (
    <>
      <h1 className='header-title'>CashFlow+</h1>
      <p className='description'>Seu gerenciador de finanças pessoal.</p>
      <TransactionProvider>
        <Summary />
        <Transaction />
      </TransactionProvider>
    </>
  )
}

export default App
