import { createContext, useContext, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    paymentMethod: string;
}

interface SummaryData {
    netBalance: number;
    totalCredit: number;
    totalDebit: number;
}

interface TransactionContextData {
    transactions: Transaction[];
    summary: SummaryData;
    refreshTransactions: () => Promise<void>
    refreshSummary: () => Promise<void>
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

    return (
        <TransactionContext.Provider value={{ transactions, summary, refreshTransactions, refreshSummary }}>
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
