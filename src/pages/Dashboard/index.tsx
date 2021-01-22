import React from 'react';
import { FiPower } from 'react-icons/fi';

import { Container, Header, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {

  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt='GoBarber' />

          <Profile>
            <img
              src='https://avatars.githubusercontent.com/u/22774348'
              alt='Nathália Assis'
            />
            <div>
              <span>Bem-vindo (a),</span>
              <strong>Nathália Assis</strong>
            </div>
          </Profile>
          <button
            type='button'
            onClick={signOut}
          >
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
}

export default Dashboard;
