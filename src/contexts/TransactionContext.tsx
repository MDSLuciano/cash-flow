import { createContext, useContext, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    paymentMethod: string;
    transactionDate: string;
}

interface SummaryData {
    netBalance: number;
    totalCredit: number;
    totalDebit: number;
}

interface SearchTransactionParams {
  query?: string
  type?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

interface TransactionContextData {
    transactions: Transaction[];
    summary: SummaryData;
    refreshTransactions: () => Promise<void>;
    refreshSummary: () => Promise<void>;
    searchTransactions: (params : SearchTransactionParams) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<SummaryData>({
        netBalance: 0,
        totalCredit: 0,
        totalDebit: 0,
    })


    const refreshTransactions = async () => {
        try {
            const response = await api.get('/transactions'); // Endpoint para buscar os dados das transações
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error('Erro ao carregar transações:', error);
        }
    }

    const refreshSummary = async () => {
        try {
            const response = await api.get('/summary'); // Endpoint para buscar os dados do sumário.
            setSummary(response.data.summary); // Atualiza o estado do sumário
        } catch (error) {
            console.error('Erro ao carregar o sumário:', error)
        }
    }

    const searchTransactions = async({ query, type, startDate, endDate }: SearchTransactionParams) => {
        try {
            const params: any = {};

            if (query) params.title = query;
            if (type) params.type = type;

            if (startDate && endDate) {
                // Se houver intervalo definido, aplica os parâmetros
                params.startDate = new Date(startDate).toISOString();
                params.endDate = new Date(endDate).toISOString();
            } else {
                // Caso nenhum intervalo seja fornecido, define o ano inteiro como padrão
                const currentYear = new Date().getFullYear();
                params.startDate = new Date(`${currentYear}-01-01T00:00:00.000Z`).toISOString();
                params.endDate = new Date(`${currentYear + 1}-01-01T00:00:00.000Z`).toISOString();
            }

            const responseTransaction = await api.get('/transactions', { params });
            const responseSummary = await api.get('/summary', { params });
            console.log(responseTransaction.data.transactions)
            setSummary(responseSummary.data.summary) // Atualiza o sumario com as transações filtradas
            setTransactions(responseTransaction.data.transactions); // Atualiza as transações filtradas
        } catch (error){
            console.error('Error searching for transactions.')
        }
    }

    return (
      <TransactionContext.Provider value={{ transactions, summary, refreshTransactions, refreshSummary, searchTransactions }}>
          {children}
      </TransactionContext.Provider>
    )
}

export const useTransactions = (): TransactionContextData => {
    const context = useContext(TransactionContext)

    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }

    return context
};
