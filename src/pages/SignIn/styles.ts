import styled, { keyframes } from 'styled-components';
import { darken, shade } from 'polished';

import backgroundSignIn from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center; /*horizontal e vertical no centro*/
  align-items: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center; /*horizontal e vertical no centro*/
  align-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      display: block;
      margin-top: 24px;
      transition: color 0.4s;
      text-decoration: none;
      color: #f4ede8;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    /** só vai estilizar o a que vir diretamente dentro do content e nao outro nivel */
    display: flex;
    align-items: center;

    margin-top: 24px;
    transition: color 0.4s;

    color: #ff9000;
    text-decoration: none;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${darken(0.1, '#FF9000')};
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${backgroundSignIn}) no-repeat center;
  background-size: cover;
`;
