import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';

import { ToastMessage, useToast } from '../../hooks/ToastContext';

import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id, {
    from: { right: '-120%', opacity: 0 }, //posição inicial do toast
    enter: { right: '0%', opacity: 1 }, //posição ao entrar
    leave: { right: '120%', opacity: 0 }, // posição final ao sair da tela
  }
  );
  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
}

export default ToastContainer;
