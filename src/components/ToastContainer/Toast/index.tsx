import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

import { Container } from './styles';

import { ToastMessage } from '../../../hooks/ToastContext'
import { useToast } from '../../../hooks/ToastContext';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {

  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 3000)

    //quando eu retorno de dentro do useEffect uma função, essa função será
    //automaticamente executada se esse componente deixar de existir
    return () => {
      clearTimeout(timer);
    }
  }, [message.id, removeToast]);


  return (
    <Container
      key={message.id}
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type='button'>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
}

export default Toast;
