import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber" />
        <form>
          <h1>Faça seu logon</h1>
          <input placeholder="E-mail" />
          <input placeholder="Senha" type="password" />
          <button type="submit">Entrar</button>
          <a href="/forgot">Esqueci minha senha</a>
        </form>
        <a href="/signUp">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
