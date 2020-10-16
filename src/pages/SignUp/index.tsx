import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="GoBarber" />
        <form>
          <h1>Faça seu cadastro</h1>
          <Input name="nome" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        <a href="/signIn">
          <FiArrowLeft />
          Criar Conta
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
