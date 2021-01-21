import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
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

interface ForgotPasswordData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {

  const { addToast } = useToast();
  // const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async (data: ForgotPasswordData) => {
    try {
      formRef.current?.setErrors({});
      setLoading(true);
      //quando eu quero validar um objeto inteiro eu crio um schema de validação
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false, //retorna todos os erros de uma vez só e não apenas o primeiro erro que encontrar
      });

      api.post('/password/forgot', {
        email: data.email
      });

      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description: 'Enviamos um e-mail para confirmar a sua recuperação de senha, cheque a sua caixa de entrada.'
      })

      //history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.'
      })
    } finally {
      setLoading(false);
    }
  }, [addToast]);
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button
              type="submit"
              loading={loading}
            >
              Recuperar
              </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
          Voltar ao login
        </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
