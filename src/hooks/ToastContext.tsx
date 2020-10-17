import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData,
);

export const ToastProvider: React.FC = ({ children }) => {

  const [messages, setMessages] = useState<ToastMessage[]>([]);
  //omit quer dizer que 'message' é do tipo todas as propriedades de ToastMessage,
  //menos 'id'
  const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    };
    setMessages(state => [...state, toast])
  }, []);
  const removeToast = useCallback((id: string) => {

    //retora toasts com o id diferente do que eu recebi
    setMessages(state => state.filter(message => message.id !== id))
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );

  // return <ToastContext.Provider value={ { addToast, removeToast } }> { children } < /ToastContext.Provider>;
}

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context;
}
