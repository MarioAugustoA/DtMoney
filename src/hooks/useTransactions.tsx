import { createContext, useEffect, useState, ReactNode, useContext} from 'react'
import { api } from '../Services/api';

interface Transaction{
    category: string;
    id:number;
    title:string;
    amount:number;
    type:string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id'| 'createdAt' >

interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction:(transaction: TransactionInput)=> Promise<void>;
}

const TrasactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

export function TrasactionsProvider({children}:TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(()=>{
        api.get('transactions')
        .then(response=> setTransactions(response.data.transactions))
    },[]);

    async  function createTransaction(trasactionInput: TransactionInput){
        const response = await api.post('/transactions', {
            ...trasactionInput,
            createdAt: new Date(),
          })
          const { transaction } = response.data;
          setTransactions([
            ...transactions, 
            transaction,
          ]);
    }

    return(
        <TrasactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TrasactionsContext.Provider>
    )

} 

export function useTransactions(){
    const context = useContext(TrasactionsContext);

    return context;
}