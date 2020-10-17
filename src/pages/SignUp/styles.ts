import styled, { keyframes } from 'styled-components';

import backgroundSignUp from '../../assets/sign-up-background.png';
import { shade, darken } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
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

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }
  > a {
    /** só vai estilizar o a que vir diretamente dentro do content e nao outro nivel */
    display: flex;
    align-items: center;
    margin-top: 24px;
    transition: color 0.4s;
    text-decoration: none;
    color: #f4ede8;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center; /*horizontal e vertical no centro*/
  align-items: center;

  width: 100%;
  max-width: 700px;
`;
export const Background = styled.div`
  flex: 1;
  background: url(${backgroundSignUp}) no-repeat center;
  background-size: cover;
`;
