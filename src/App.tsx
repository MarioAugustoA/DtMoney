import Modal from 'react-modal';
import { useState } from 'react';
import { Dashboard } from "./components/Dashboard";
import {Header} from "./components/Header";
import { GloblalStyle } from "./styles/globals";
import { NewTransactionModal } from './components/NewTrasactionModal';
import {  TrasactionsProvider } from './hooks/useTransactions';
Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransectionModalOpen] = useState(false);

  function handleOpenNewTransactionModal(){
      setIsNewTransectionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransectionModalOpen(false);
  }

  return (
    <TrasactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>
      <NewTransactionModal 
      isOpen={isNewTransactionModalOpen} 
      onRequestClose={handleCloseNewTransactionModal}/>
     <GloblalStyle/>
     
    </TrasactionsProvider>
  );
}


