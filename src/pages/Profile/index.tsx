import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft, FiCalendar, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/ToastContext';
import { useAuth } from '../../hooks/AuthContext';

const Profile: React.FC = () => {
  //void é o retorno da funcao

  interface ProfileFormdata {
    name: string;
    email: string;
    password: string;
  }
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormdata) => {
    try {
      formRef.current?.setErrors({});

      //quando eu quero validar um objeto inteiro eu crio um schema de validação
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false, //retorna todos os erros de uma vez só e não apenas o primeiro erro que encontrar
      });

      await api.post('users', data);
      history.push('/');
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer o seu logon no GoBarber!'
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer o seu cadastro, tente novamente.'
      })
    }
  }, [addToast, history]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email
          }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />

            <button type='button'>
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input
            name="name"
            icon={FiUser}
            placeholder="Nome"
          />
          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
          />
          <Input
            containerStyle={{ marginTop: '24px' }}
            type="old_password"
            icon={FiLock}
            name="password"
            placeholder="Senha atual"
          />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Nova senha"
          />
          <Input
            type="password_confirmation"
            icon={FiLock}
            name="password"
            placeholder="Confirmar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
