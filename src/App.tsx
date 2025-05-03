import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Summary from './components/Summary/Summary'
import { FilterProvider } from './contexts/FilterContext'
import { TransactionProvider } from './contexts/TransactionContext'
import Transaction from './pages/Transactions/Transactions'

function App() {

  return (
    <>
      <h1 className='header-title'>CashFlow+</h1>
      <p className='description'>Seu gerenciador de finanças pessoal.</p>
      <TransactionProvider>
        <FilterProvider >
            <Summary />
            <SearchBar />
            <Transaction />
        </FilterProvider>
      </TransactionProvider>
    </>
  )
}

export default App
