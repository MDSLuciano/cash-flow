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

interface TransactionContextData {
    transactions: Transaction[];
    refreshTransactions: () => Promise<void>
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const refreshTransactions = async () => {
        const response = await api.get('/');
        setTransactions(response.data.transactions);
    }

    return (
        <TransactionContext.Provider value={{ transactions, refreshTransactions }}>
            {children}
        </TransactionContext.Provider>
    )
}



export const useTransactions = (): TransactionContextData => {
    return useContext(TransactionContext)
};
