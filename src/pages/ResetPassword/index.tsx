import React, { useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Logo from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';

interface ResetPasswordData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const token = location.search.replace('?token=', '');

  const formRef = useRef<FormHandles>(null);


  const handleSubmit = useCallback(async (data: ResetPasswordData) => {
    try {
      formRef.current?.setErrors({});

      //quando eu quero validar um objeto inteiro eu crio um schema de validação
      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'O campo confirmação de senha deve ser igual a senha. ')
      });

      await schema.validate(data, {
        abortEarly: false, //retorna todos os erros de uma vez só e não apenas o primeiro erro que encontrar
      });

      if (!token) throw new Error();

      const { password, password_confirmation } = data;

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token,
      });

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar a sua senha, tente novamente.'
      })
    }
  }, [addToast, history, token]);
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              type="password"
              icon={FiLock}
              name="password"
              placeholder="Nova senha"
              data-testid="new-password"
            />
            <Input
              type="password"
              icon={FiLock}
              name="password_confirmation"
              placeholder="Confirmação da nova senha"
              data-testid="new-password-confirmation"
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
